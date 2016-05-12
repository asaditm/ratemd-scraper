function getStates() {
  return [
    {
      state: 'config',
      config: {
        name: 'config',
        url: '/config',
        template: '<h1>config test</h1>'
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
