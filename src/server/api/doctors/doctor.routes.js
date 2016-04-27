import Controller from './doctor.controller';

function register(router) {
  const ctrl = new Controller();
  router
    .route('/doctors')
    .get(ctrl.all)
    .post(ctrl.create);

  router
    .route('/doctors/:id')
    .post(ctrl.update)
    .get(ctrl.show)
    .delete(ctrl.destroy);

  router
    .route('/doctors/:id/scrape')
    .get(ctrl.scrape);
}

export default register;
