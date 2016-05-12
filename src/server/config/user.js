import { join } from 'path';
import fs from 'fs';

import { merge } from 'lodash';
import jsonfile from 'jsonfile';

import defaults from './defaults';
import logger from '../logger';
import { emit } from '../sockets';

const configPath = join(defaults.paths.data, 'user.config.json');

export const defaultUserConfig = {
  port: '',
  secrets: {
    session: ''
  },
  database: {
    username: '',
    password: '',
    forceCreation: false
  },
  log: {
    level: '',
    short: false
  },
  scraper: {},
  email: {
    domain: '',
    apiKey: '',
    from: '',
    subject: '',
    body: '',
    html: ''
  }
};

class UserConfig {
  read() {
    return new Promise((resolve, reject) => {
      jsonfile.readFile(configPath, (err, obj) => resolve(obj || {}));
    });
  }

  update(config) {
    // TODO if scraper config is changed, then update the scraper service
    const log = logger.create('Config:User');
    return this.read().then((savedConfig) => {
      const merged = merge({}, savedConfig, config);
      log.debug('Saving new config: ', config);
      emit('userconfig:save', config);
      jsonfile.writeFile(configPath, merged, { spaces: 2 }, (err) => {
        if (err) {
          log.error('Saving config failed', err);
          throw err;
        }
        return;
      });
    });
  }
}

export default UserConfig;
