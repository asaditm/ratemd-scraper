/**
 * Container component that displays each divided part from
 * UI components.
 */
import './main.scss';
import buildAddDialog from '../ui/doctors/addDialog/add-dialog';

/* eslint indent: 0 */
const template = [
  '<div class="main" layout="row" layout-align="center center">',
    '<md-card flex-gt-sm="90" flex-gt-md="70">',
      '<md-card-content>',
        '<h2>Monitored Doctors</h2>',
        '<doctors-list></doctors-list>',
      '</md-card-content>',
    '</md-card>',
    '<md-button class="md-fab md-fab-bottom-right" aria-label="Add" ng-click="$ctrl.showAddDoctor($event)">',
      '<ng-md-icon icon="add"></ng-md-icon>',
    '</md-button>',
  '</div>'
].join('');

/** @ngInject */
function controller($mdDialog) {
  const showAdd = (event) => {
    $mdDialog.show(buildAddDialog(event)).then((result) => {
      console.log('main.ctrl: inside', result);
    })
    .catch(() => console.log('cancelled dialog'));
  };

  this.showAddDoctor = showAdd;
}

const mainComponent = {
  bindings: {
    name: '@'
  },
  template,
  controller
};

export default mainComponent;
