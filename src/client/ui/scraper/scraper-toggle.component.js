/* eslint indent: 0 */
const template = [
  '<md-button class="md-icon-button" aria-label="Favorite" ng-click="$ctrl.scrape()">',
    '<md-icon ',
      'ng-hide="$ctrl.error || $ctrl.hasNewReview" ',
      'md-font-icon="fa fa-refresh" ',
      'ng-class="{\'fa-spin\': $ctrl.scraping}">',
    '</md-icon>',
    '<md-icon ',
      'ng-show="$ctrl.error" ',
      'md-font-icon="fa fa-exclamation-triangle">',
    '</md-icon>',
    '<md-icon ',
      'ng-show="$ctrl.hasNewReview" ',
      'md-font-icon="fa fa-asterisk">',
    '</md-icon>',
  '</md-button>',
].join('');

const bindings = {
  id: '<'
};

/** @ngInject */
function controller($scope, doctorsService) {
  function scrape() {
    return doctorsService.scrape(this.id);
  }

  $scope.$on(`socket:scrape:${this.id}`, (event, data) => Object.assign(this, data));

  this.scrape = scrape;
  this.scraping = false;
  this.error = false;
}

export default { name: 'scraperToggle', template, bindings, controller };
