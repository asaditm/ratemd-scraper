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

const _config = {};
let instance, doctor, review = {};

function addDefaultEmailBeforeCreate(user, options) {
  if (!user.emailList) {
    user.emailList = [];
  }
  user.emailList.push(_config.email.defaultRecipient || '');
}

function scrapeOnCreate(createdDoctor) {
  log.info(`Scraping newly created doctor [${createdDoctor.name}]`);
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

export function registerModelSocketEvents(model) {
  const onSave = (document = {}) => emit(`${model.tableName}:save`, document);
  const onDelete = (document = {}) => emit(`${model.tableName}:delete`, document);

  model.afterCreate('create', onSave);
  model.afterUpdate('update', onSave);
  model.afterDelete('delete', onDelete);
}

function init(config) {
  Object.assign(_config, config);
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

  if (config.database.force) {
    log.info('Forcing the creation of tables');
  }

  const tables = [doctor, review];
  const promises = [];
  for (const table of tables) {
    registerModelSocketEvents(table);
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
