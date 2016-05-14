import templateUrl from './view-dialog.tpl.html';

/** @ngInject */
function controller($scope, $mdDialog, $mdConstant, locals, doctorsService) {
  $scope.locals = locals;
  // Dialog actions
  $scope.hide = () => $mdDialog.hide();
  $scope.cancel = () => $mdDialog.cancel();
}

export function build(doctor, targetEvent) {
  return {
    controller,
    templateUrl,
    targetEvent,
    parent: angular.element(document.body),
    clickOutsideToClose: true,
    locals: { doctor }
  };
}

export default build;
