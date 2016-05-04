import { join } from 'path';
import fs from 'fs';

import bluebird from 'bluebird';
import jsonfile from 'jsonfile';

import defaults from './defaults';

const fsP = bluebird.promisifyAll(fs);
const configPath = join(defaults.paths.data, 'user.config.json');

const defaultUserConfig = {
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
    // TODO refactor?
    return new Promise((resolve, reject) => {
      jsonfile.writeFile(configPath, config, { spaces: 2 }, (err) => {
        if (err) {
          console.error('Saving config failed', err);
          return false;
        }
        return true;
      });
    });
  }
}
