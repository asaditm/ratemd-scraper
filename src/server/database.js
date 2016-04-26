import path from 'path';
import { EventEmitter } from 'events';

import mkdirp from 'mkdirp';
import Sequelize from 'sequelize';

export const database = {};

export default class Database {
  init(app) {
    const options = {
      dialect: 'sqlite',
      storage: path.join(__dirname, 'data', 'database.sqlite')
    }

    mkdirp.sync(path.dirname(options.storage));

    Object.assign(database, {
      Sequelize: Sequelize,
      instance: new Sequelize('data', 'admin', 'admin', options),
      models: {},
      register: this.register,
      events: new DatabaseEvents()
    });
  }

  register(model) {
    if (database.instance) {
      const modelInstance = database.instance.define(model.name, model.schema, model.methods);
      database.events.register(modelInstance);

      const registered = {};
      registered[model.name] = modelInstance;
      Object.assign(database.models, registered);
    } else {
      console.error('Database has not been initialized', database);
    }
  }

  sync() {
    const promises = [];
    console.log('Syncing database');
    promises.push(database.instance.sync());
    for (const model of Object.keys(database.models)) {
      promises.push(database.models[model].sync());
    }
    return Promise.all(promises);
  }

  finalize() {
    console.log('Finalizing database initialization');
    return this.sync()
      .then(() => {
        console.log('Registered all models');
      })
      .catch((err) => {
        console.error('Registering databases failed', err);
        throw err;
      });
  }
}

class DatabaseEvents extends EventEmitter {
  constructor() {
    super();
  }

  register(model) {
    model.afterBulkCreate('bulkCreate', (attr) => this.emit('bulkSave', attr));
    model.afterBulkUpdate('bulkUpdate', (attr) => this.emit('bulkSave', attr));
    model.afterBulkDelete('bulkDelete', (attr) => this.emit('bulkCreate', attr));

    model.afterCreate('create', (attr) => this.emit('save', attr));
    model.afterUpdate('update', (attr) => this.emit('save', attr));
    model.afterDelete('delete', (attr) => this.emit('delete', attr));

    return model;
  }
}