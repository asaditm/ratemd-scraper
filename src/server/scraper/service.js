import Promise from 'bluebird';

import { Doctor, Review } from '../database';
import { emit } from '../sockets';
import Scraper from './scraper';

export class ScraperService {
  /**
   * Scrape a single doctor
   * @param object doctor Doctor object to scrape
   */
  single(doctor) {
    emit('scrape:start', doctor);

    const scraper = new Scraper();
    return scraper.fullScrape().fromDoctor(doctor)
      .then((result) => {
        // Check to make sure the scraped id was valid
        if (!result.doctor.name) {
          return false;
        }

        // Update the doctor data in the database
        doctor.update(result.doctor);

        // Get the latest review and compare with results
        const scrapedReview = result.review;
        return doctor.getReview().then((oldReview) => {
          let isNewer = false;
          if (oldReview) {
            isNewer = oldReview.reviewId !== scrapedReview.reviewId;
          }

          if (!oldReview || isNewer) {
            return Review().create(scrapedReview)
              .then((reviewInstance) => doctor.setReview(reviewInstance))
              .then(() => {
                emit('scrape:finish', doctor);
                if (isNewer) {
                  // TODO Email Admin + all users in doctor:emailList
                }
                return doctor;
              })
              .catch((err) => {
                console.error('Setting doctors review failed', err);
                emit('scrape:failed', err);
                throw err;
              });
          }
          emit('scrape:finish', doctor);
          return doctor;
        });
      })
      .catch((err) => {
        console.error(`Failed to scrape doctor ${doctor.siteId}`, err);
        return emit('scrape:failed', err);
      });
  }

  /**
   * Scrape all the doctors in the database
   */
  all() {
    emit('scrapeAll:start');
    Doctor.findAll()
      .then((doctors) => {
        console.log(`Scraping [${doctors.length}] doctors.`);

        const scrapePromises = [];
        for (const doctor of doctors) {
          scrapePromises.push(this.single(doctor));
        }

        Promise.all(scrapePromises).then(() => {
          console.log('Scraping for all doctors finished');
          emit('scrapeAll:finish');

          // Schedule next scrape
        });
      })
      .catch((err) => {
        console.error('Error finding all doctors', err);
      });
  }
}

export default ScraperService;
