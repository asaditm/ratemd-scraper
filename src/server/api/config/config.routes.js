import Controller from './config.controller';

export function register(router) {
  const ctrl = new Controller();
  router
    .route('/config')
    .get(ctrl.retrieve)
    .post(ctrl.update);
}

export default { register };
