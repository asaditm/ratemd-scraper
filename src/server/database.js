import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import { Doctor as modelDoctor } from './api/doctors/doctor.model';
import { Review as modelReview } from './api/reviews/review.model';
import ScraperService from './scraper/service';

const force = process.env.FORCE_CREATE;
const scraper = new ScraperService();

let instance, doctor, review = {};

function scrapeOnCreate(createdDoctor) {
  console.log(`Scraping new doctor with id of [${createdDoctor.siteId}]`);
  scraper.single(createdDoctor)
    .then((result) => {
      if (!result) {
        console.log(`Scraping for ${createdDoctor.siteId} failed, removing from database`);
        return createdDoctor.destroy();
      }
      console.log(`Scraping for newly created doctor [${result.name}] was a success`);
    })
    .catch((err) => console.error('Error scraping on create', err));
}

function init(config) {
  const options = {
    dialect: 'sqlite',
    storage: path.join(config.dir.static, 'data', 'database.sqlite')
  };
  mkdirp.sync(path.dirname(options.storage));

  // Create instances of database and table
  instance = new Sequelize('database', 'admin', 'admin', options);
  doctor = instance.define(modelDoctor.name, modelDoctor.schema);
  review = instance.define(modelReview.name, modelReview.schema);

  // Register associations
  doctor.hasOne(review, { onDelete: 'cascade', hooks: true });

  // Register model hooks
  doctor.afterCreate('createScrape', scrapeOnCreate);

  // Create the tables in the database
  if (force) {
    console.log('Forcing the creation of tables');
  }
  doctor.sync({ force });
  review.sync({ force });

  return Promise.resolve();
}

export function sequelize() {
  return instance;
}

export function Doctor() {
  return doctor;
}

export function Review() {
  return review;
}

export default { init };


// Add socket events?
// class DatabaseEvents extends EventEmitter {
//   constructor() {
//     super();
//   }

//   register(model) {
//     model.afterBulkCreate('bulkCreate', (attr) => this.emit('bulkSave', attr));
//     model.afterBulkUpdate('bulkUpdate', (attr) => this.emit('bulkSave', attr));
//     model.afterBulkDelete('bulkDelete', (attr) => this.emit('bulkCreate', attr));

//     model.afterCreate('create', (attr) => this.emit('save', attr));
//     model.afterUpdate('update', (attr) => this.emit('save', attr));
//     model.afterDelete('delete', (attr) => this.emit('delete', attr));

//     return model;
//   }
// }
