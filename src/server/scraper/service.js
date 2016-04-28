import Promise from 'bluebird';

import { Doctor } from '../database';
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
    return scraper.scrape().fromDoctor(doctor)
      .then((result) => {
        // Check to make sure the scraped id was valid
        if (!result.name) {
          return false;
        }

        // Update the doctor data in the database
        doctor.update(scraper.toDoctor(result));

        // Get the latest review and compare with results
        const scrapedReview = scraper.toReview(result);
        doctor.getReview().then((oldReview) => {
          // First time scraping the review
          if (!oldReview.reviewId) {
            doctor.setReview(scrapedReview);
          } else if (oldReview.reviewId !== scrapedReview.reviewId) {
            doctor.setReview(scrapedReview);
            // Email Admin + all users in doctor:emailList
          }
          emit('scrape:finish', doctor);
          return doctor;
        });
      })
      .catch((err) => {
        console.error(`Failed to scrape doctor ${doctor.siteId}`, err);
        return emit('scrape:failed', doctor);
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
