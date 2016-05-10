/* eslint indent: 0 */
const template = [
  '<md-button class="md-icon-button" aria-label="{{$ctrl.aria || $ctrl.icon}}">',
    '<ng-md-icon icon="{{$ctrl.icon}}" style="fill: white"></ng-md-icon>',
  '</md-button>',
].join('');

const bindings = {
  icon: '@',
  aria: '@?'
};

export default { name: 'toolbarButton', bindings, template };
