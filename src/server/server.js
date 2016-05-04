/**
 * A Simple node server written in ES6 intended to launch an express server.
 *
 * The root route is sent the angular html, with the static director set to
 * 'static/`, compiled angular files should be located in 'static/dist`.
 * Ensure that they have been compiled by running `npm build`
 */
import { join } from 'path';
import * as http from 'http';
import * as fs from 'fs';

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
import routes from './routes';
import scraper from './scraper';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

configuration.all(true).then((config) => {
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
  logger.init(config).then(() => {
    const log = logger.create('Server');
    log.info('Initializing server components')
       .debug('Using config', config);

    database.init(config)
      .then(() => routes.register(app, config))
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
      .then(() => scraper.start(config.scraper.interval))
      .catch((err) => {
        log.error('Error initializing server', err);
        throw err;
      });
  });
});
