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
    emit('scrape:start', doctor.name); // TODO change back to doctor

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
        return doctor.getReview().then((oldReview) => {
          let isNewer = false;
          if (oldReview) {
            isNewer = oldReview.reviewId !== result.review.reviewId;
          }

          let query;
          if (!oldReview) {
            query = Review().create(result.review)
              .then((reviewInstance) => doctor.setReview(reviewInstance));
          } else if (isNewer) {
            query = oldReview.update(result.review);
          }

          // If there is no review, or a newer review emit finish event
          if (query) {
            return query.then(() => {
              emit('scrape:finish', Object.assign(doctor, { review: result.review }).id);
              if (isNewer) {
                // TODO Email Admin + all users in doctor:emailList
                emit('scrape:new', `New review for ${doctor.name}`);
              }
              return doctor;
            });
          }

          // Nothing to do, finish up
          emit('scrape:finish', Object.assign(doctor, { review: oldReview }).name); // TODO change back to doctor
          return doctor;
        });
      })
      .catch((err) => {
        console.error(`Failed to scrape doctor [${doctor.id}]`, err);
        return emit('scrape:failed', Object.assign(err, { doctor: { id: doctor.id } }));
      });
  }

  /**
   * Scrape all the doctors in the database
   */
  all() {
    return Doctor().findAll()
      .then((doctors) => {
        if (doctors.length === 0) {
          console.log('[ScraperService] Nothing to do');
          return;
        }

        emit('scrapeAll:start');
        console.log(`Scraping [${doctors.length}] doctors.`);
        const scrapePromises = [];
        for (const doctor of doctors) {
          scrapePromises.push(this.single(doctor));
        }

        return Promise.all(scrapePromises).then(() => {
          console.log('Scraping for all doctors finished');
          emit('scrapeAll:finish');
        });
      })
      .catch((err) => console.error('Error finding all doctors', err));
  }
}

export default ScraperService;
