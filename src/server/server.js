import { join } from 'path';
import http from 'http';
import Express from 'express';
import PrettyError from 'pretty-error';
import favicon from 'serve-favicon';
import compression from 'compression';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import errorHandler from 'errorhandler';
import helmet from 'helmet';

import configuration from './config';
import logger from './logger';
import database from './database';
import sockets from './sockets';
import routes from './routes';
import scraper from './scraper';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

export default function init() {
  return configuration.all().then((config) => {
    // Setup the server
    app.use(compression());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.use(methodOverride());
    app.use(cookieParser());
    app.use(helmet());
    app.use(Express.static(config.paths.static));
    app.use(favicon(join(config.paths.static, 'favicon.ico')));

    // Setup middleware
    if (config.env === 'production') {
      app.use(morgan('short', {
        skip: (req, res) => res.statusCode < 400
      }));
    } else {
      app.use(morgan('dev'));
      app.use(errorHandler());
    }

    // Setup the database then routes
    return logger.init(config).then(() => {
      const log = logger.create('Server');
      log.info('Initializing server components')
        .debug('Using config', config);

      return database.init(config)
        .then(() => routes.register(app, config))
        .then(() => sockets.init(server))
        .then(() => {
          server.listen(config.port, (err) => {
            if (err) {
              log.error(`Error listening on port :${config.port}`);
              throw err;
            } else {
              log.info(`✅ OK ${config.title} is running on http://localhost:${config.port}.`);
              return Promise.resolve();
            }
          });
        })
        .then(() => {
          if (config.scraper.enabled) {
            return scraper.start(config.scraper.interval);
          }
          log.info('Not starting scraper, it is disabled');
        })
        .catch((err) => {
          log.error('Error initializing server', err);
          throw err;
        });
    });
  });
}
