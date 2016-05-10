/** @ngInject */
export function setTheme($mdThemingProvider) {
  const blueMap = $mdThemingProvider.extendPalette('light-blue', {
    contrastDefaultColor: 'light',
    contrastDarkColors: ['50'],
    50: 'ffffff'
  });

  $mdThemingProvider.definePalette('customBlue', blueMap);

  $mdThemingProvider
    .theme('default')
    .primaryPalette('customBlue', {
      default: '500',
      'hue-1': '50'
    })
    .accentPalette('pink');

  $mdThemingProvider
    .theme('input', 'default')
    .primaryPalette('grey');
}

export default setTheme;
