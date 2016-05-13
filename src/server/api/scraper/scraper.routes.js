import Controller from './scraper.controller';

export function register(router) {
  const ctrl = new Controller();
  router
    .route('/scraper/toggle')
    .get(ctrl.toggleService);

  router
    .route('/scraper/all')
    .get(ctrl.scrapeAll);

  router
    .route('/scraper/:id')
    .get(ctrl.scrape);
}

export default { register };
