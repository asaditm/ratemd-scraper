/* eslint indent: 0 */
const template = [
  '<md-list class="doctors-list">',
    '<md-subheader class="md-no-sticky">{{$ctrl.socket.doctors.length || 0}} doctors</md-subheader>',
    '<md-list-item class="md-3-line" ng-repeat="doctor in $ctrl.socket.doctors">',
      '<ng-md-icon icon="person" class="md-avatar-icon"></ng-md-icon>',
      '<div class="md-list-item-text" layout="column">',
        '<h3>{{doctor.name}}</h3> - ID: {{doctor.id}}',
        '<h4>{{doctor.rating}}</h4>',
        '<p ng-hide="!doctor.review">{{doctor.review.created}}</p>',
      '</div>',
      '<md-divider md-inset hide-sm ng-if="!$last"></md-divider>',
      '<md-divider hide-gt-sm ng-if="!$last"></md-divider>',
    '</md-list-item>',
  '</md-list>'
].join('');

// TODO refactor out item to it's own directive
// TODO add an error when doctos couldn't be loaded

/** @ngInject */
function controller(doctorsSocket) {
  doctorsSocket.activate().then(() => {
    this.socket = doctorsSocket;
    console.log('DList Activated');
  });
}

const bindings = {};

export default { name: 'doctorsList', bindings, template, controller };
