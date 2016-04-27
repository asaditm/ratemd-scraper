import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

import { Doctor as modelDoctor, Review as modelReview } from './api/doctors/doctor.model';

const force = process.env.FORCE_CREATE;

let instance, doctor, review = {};

function init(config) {
  const options = {
    dialect: 'sqlite',
    storage: path.join(config.dir.static, 'data', 'database.sqlite')
  };
  mkdirp.sync(path.dirname(options.storage));

  instance = new Sequelize('database', 'admin', 'admin', options);

  doctor = instance.define(modelDoctor.name, modelDoctor.schema);
  review = instance.define(modelReview.name, modelReview.schema);

  doctor.hasOne(review);

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
