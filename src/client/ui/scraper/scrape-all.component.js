/* eslint indent: 0 */
const template = [
  '<md-button class="md-icon-button" aria-label="Scrape all" ng-click="$ctrl.scrape()">',
    '<md-icon ',
      'md-font-icon="fa fa-refresh" ',
      'ng-class="{\'fa-spin\': $ctrl.scraping}">',
    '</md-icon>',
  '</md-button>',
].join('');

const bindings = {};

// TODO split scraper-toggle.component into this, get rid of duplication

/** @ngInject */
function controller($scope, doctorsService, doctorsSocket) {
  function scrape() {
    return doctorsService.scrapeAll();
  }

  // TODO REFACTOR, FOR DEMO PURPOSE ONLY

  $scope.$on('socket:scrape:all', (event, data) => Object.assign(this, data));

  this.scrape = scrape;
  this.scraping = false;
  this.error = false;
}

export default { name: 'scrapeAll', template, bindings, controller };
