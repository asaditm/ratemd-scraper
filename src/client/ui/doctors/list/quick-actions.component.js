import buildViewDoctorDialog from '../viewDialog/view-dialog';

/* eslint indent: 0 */
const template = [
  '<div layout="row" class="quick-actions" layout-align="center center">',
    '<scraper-toggle id="$ctrl.id"></scraper-toggle>',
    '<md-button class="md-icon-button" aria-label="Favorite" ng-click="$ctrl.view($event)">',
      '<md-icon md-font-icon="fa fa-external-link"></md-icon>',
    '</md-button>',
    '<md-button class="md-icon-button" aria-label="Favorite" ng-click="$ctrl.deleteAlert($event)">',
      '<md-icon md-font-icon="fa fa-trash"></md-icon>',
    '</md-button>',
  '</div>'
].join('');

const bindings = {
  id: '<'
};

/** @ngInject */
function controller($scope, $mdDialog, scraperSocket, doctorsService, doctorsSocket) {
  function view(targetEvent) {
    const doctor = doctorsSocket.find(this.id);
    $mdDialog.show(buildViewDoctorDialog(doctor, targetEvent));
    console.log('view');
  }

  function deleteAlert(targetEvent) {
    const doctor = doctorsSocket.find(this.id);
    const confirm = $mdDialog.confirm()
      .title('Would you like to delete this doctor?')
      .textContent(`Are you sure you wish to no longer monitor ${doctor.name}?\nThis is cannot be undone.`)
      .targetEvent(targetEvent)
      .ok('Yes')
      .cancel('No');

    $mdDialog.show(confirm).then(() => doctorsService.destroy(this.id));
  }

  this.view = view;
  this.deleteAlert = deleteAlert;
}

export default { name: 'quickActions', template, bindings, controller };
