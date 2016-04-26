import Controller from './doctor.controller';

function register(router) {
  const ctrl = new Controller();
  router
    .route('/doctors')
    .get(ctrl.all)
    .post(ctrl.create);

  router
    .route('/doctors/:id')
    .get(ctrl.show)
    .delete(ctrl.destroy);
}

export default register;
