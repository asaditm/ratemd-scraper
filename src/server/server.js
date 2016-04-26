/**
 * A Simple node server written in ES6 intended to launch an express server.
 *
 * The root route is sent the angular html, with the static director set to
 * 'static/`, compiled angular files should be located in 'static/dist`.
 * Ensure that they have been compiled by running `npm build`
 */

import { install } from 'source-map-support';
install();

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

import database from './database';
import routes from './routes';

const pretty = new PrettyError();
const app = new Express();
const server = new http.Server(app);

/**
 * Setup config object
 */
const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

const config = Object.assign({
  port: process.env.PORT,
  dir: {
    static: join(__dirname, '../..', 'static')
  }
}, environment);

/**
 * Setup the application
 */
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
app.use(helmet());
app.use(Express.static(config.dir.static));
app.use(favicon(join(config.dir.static, 'favicon.ico')));

if (config.isProduction) {
  app.use(morgan('short', {
    skip: (req, res) => res.statusCode < 400
  }));
} else {
  app.use(morgan('dev'));
  app.use(errorHandler());
}

/**
 * Setup the database then routes
 */
database.init(config)
  .then(() => routes.register(app, config));

/**
 * Start the server
 */
if (config.port) {
  server.listen(config.port, (err) => {
    if (err) {
      console.info('==>    ERROR: Error listening on port :%s', config.port);
      console.error(pretty.render(err));
    } else {
      console.info('\n==>     ✅ OK %s is running on http://localhost:%s.', config.title, config.port);
    }
  });
} else {
  console.error('==>    ERROR: No PORT environment variable was specified');
}
