import Controller from './review.controller';

export function register(router) {
  const ctrl = new Controller();
  router
    .route('/reviews')
    .get(ctrl.all);

  router
    .route('/doctors/:id/review')
    .get(ctrl.show);
}

export default { register };
