import express from 'express';
import { createReadStream } from 'fs';
import { join } from 'path';

import doctors from './api/doctors/doctor.routes';
import reviews from './api/reviews/review.routes';

function register(app, config) {
  // Register the api routes
  const router = express.Router();
  doctors.register(router);
  reviews.register(router);
  router.route('/').all((req, res) => res.status(200).json('You\'ve reached the API'));
  router.route('/*').all((req, res) => res.status(404).json('Invalid API Route'));

  app.use('/api', router);

  // Register the static routes
  app.route('/')
  .get((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    createReadStream(join(config.paths.static, 'client', 'index.html')).pipe(res);
  });

  Promise.resolve();
}

export default { register };
