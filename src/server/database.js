import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import doctorModel from './api/doctors/doctor.model';
import reviewModel from './api/reviews/review.model';

let instance, doctor, review = {};

function init() {
  const options = {
    dialect: 'sqlite',
    storage: path.join(__dirname, 'data', 'database.sqlite')
  };
  mkdirp.sync(path.dirname(options.storage));

  instance = new Sequelize('database', 'admin', 'admin', options);

  doctor = instance.define(doctorModel.name, doctorModel.schema);
  review = instance.define(reviewModel.name, reviewModel.schema);

  doctor.hasOne(review);
  doctor.sync();
  review.sync();

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
