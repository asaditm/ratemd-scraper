import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import logger from './logger';
import { emit } from './sockets';
import { Doctor as modelDoctor } from './api/doctors/doctor.model';
import { Review as modelReview } from './api/reviews/review.model';
import ScraperService from './scraper/service';

const log = logger.create('Database');
const scraper = new ScraperService();

const globalConfig = {};
let instance, doctor, review = {};

function scrapeOnCreate(createdDoctor) {
  log.info(`Scraping newly created doctor [${createdDoctor.name}]`);
  emit('doctors:create', createdDoctor);
  scraper.single(createdDoctor)
    .then((result) => {
      if (!result) {
        log.error(`Scraping for [${createdDoctor.name}] failed, removing from database`);
        return createdDoctor.destroy();
      }
      log.info(`New doctor [${result.name}] was scraped`);
    })
    .catch((err) => log.error('Error scraping on create', err));
}

function init(config) {
  Object.assign(globalConfig, config);
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
  doctor.afterCreate('create', scrapeOnCreate);
  doctor.afterDelete('delete', (document = {}) => emit('doctors:delete', document));
  doctor.afterUpdate('update', (updated) => {
    setTimeout(() =>
      doctor.findById(updated.id, { include: [{ model: review }] })
        .then(doc => emit('doctors:update', doc))
    , 1000);
  });

  // TODO remove the delay, and have client listen for the scrape:finish event
  // TODO and use lodash.merge to combine the doctor + review prop

  if (config.database.force) {
    log.warning('Dropping tables before creating').warning('Disable in [user.config.json:force]');
  }

  const tables = [doctor, review];
  const promises = [];
  for (const table of tables) {
    promises.push(table.sync({ force: config.database.force }));
  }

  return Promise.all(promises);
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

export default { init, sequelize, Doctor, Review };
