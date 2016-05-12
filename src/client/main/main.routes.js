/**
 * Main and only route
 *
 * loads the Main.component
 */
function getStates() {
  return [
    {
      state: 'home',
      config: {
        name: 'home',
        url: '/',
        template: '<main name="George"></main>'
      }
    }
  ];
}

/** @ngInject */
export default function configureStates($stateProvider) {
  const states = getStates();
  states.forEach((state) => $stateProvider.state(state.state, state.config));
  return states;
}
