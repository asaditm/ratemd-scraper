import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import logger from './logger';
import { Doctor as modelDoctor } from './api/doctors/doctor.model';
import { Review as modelReview } from './api/reviews/review.model';
import ScraperService from './scraper/service';

// TODO pull from config
const force = process.env.FORCE_CREATE;

const log = logger.create('Database');
const scraper = new ScraperService();

let instance, doctor, review = {};

function addDefaultEmailBeforeCreate(user, options) {
  if (!user.emailList) {
    user.emailList = [];
  }
  // TODO replace with email from config file
  user.emailList.push('admin@email.account');
}

function scrapeOnCreate(createdDoctor) {
  console.log(`Scraping newly created doctor [${createdDoctor.name}]`);
  scraper.single(createdDoctor)
    .then((result) => {
      if (!result) {
        console.log(`Scraping for [${createdDoctor.name}] failed, removing from database`);
        return createdDoctor.destroy();
      }
      console.log(`Scraping for newly created doctor [${result.name}] was a success`);
    })
    .catch((err) => console.error('Error scraping on create', err));
}

function init(config) {
  const options = {
    dialect: 'sqlite',
    storage: path.join(config.paths.data, 'database.sqlite'),
    logging: (sql) => log.debug('[SQL]\n', sql)
  };

  // Create instances of database and table
  instance = new Sequelize('database', 'admin', 'admin', options);
  doctor = instance.define(modelDoctor.name, modelDoctor.schema);
  review = instance.define(modelReview.name, modelReview.schema);

  // Register associations
  doctor.hasOne(review, { onDelete: 'cascade', hooks: true });

  // Register model hooks
  doctor.beforeCreate('addDefaultEmail', addDefaultEmailBeforeCreate);
  doctor.afterCreate('createScrape', scrapeOnCreate);

  // Create the tables in the database
  // TODO grab from config object
  if (force) {
    console.log('Forcing the creation of tables');
  }

  return doctor.sync({ force })
    .then(() => review.sync({ force }));
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
