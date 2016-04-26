import Controller from './doctors.controller';

function register(router) {
  const ctrl = new Controller();

  router
    .route('/doctors')
    .get(ctrl.all)
    .post(ctrl.create)
    .post(ctrl.remove);

  router
    .route('/doctors/:id')
    .get(ctrl.show);
}

export default register;