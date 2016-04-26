import express from 'express';

import { database } from './database';
import routeDoctors from './api/doctors/doctors.routes';

class Routes {
  init(app, config) {
    console.log('Registering routes');

    // Api routes
    database.register()

    // Static routes
    app.route('/')
      .get((req, res) => {
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream(join(config.dir.static, 'dist', 'index.html'))
          .pipe(res);
      });
  }
}