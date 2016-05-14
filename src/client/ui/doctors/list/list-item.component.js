/* eslint indent:0 */
const template = [
  '<md-list-item class="md-3-line">',
    '<ng-md-icon hide-xs icon="person" class="md-avatar-icon"></ng-md-icon>',
    '<div class="md-list-item-text" layout="column" layout-align="space-between center>',
      '<div layout="column" flex>',
        '<h3>{{$ctrl.doctor.name}}</h3>',
        '<h4>{{$ctrl.doctor.rating}}</h4>',
        '<p ng-hide="!$ctrl.doctor.review">{{$ctrl.doctor.review.created}}</p>',
      '</div>',
      '<quick-actions id="$ctrl.doctor.id" layout-align="center end"></quick-actions>',
    '</div>',
    '<md-divider md-inset hide-sm ng-if="!$ctrl.last"></md-divider>',
    '<md-divider hide-gt-sm ng-if="!$ctrl.last"></md-divider>',
  '</md-list-item>'
].join('');

/** @ngInject */
function controller(doctorsSocket) {
}

const bindings = {
  doctor: '=',
  last: '='
};

export default { name: 'doctorItem', bindings, template, controller };
