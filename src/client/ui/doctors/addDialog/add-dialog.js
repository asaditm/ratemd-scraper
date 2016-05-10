import templateUrl from './add-dialog.tpl.html';

function addDoctor(doctorsService, doctor) {
  // TODO validate that the emailList actually contains emails

  // Attempt to add doctor
  // If link is invalid, display to user
  // If it is okay, then display message telling user that data will be eventually loaded
  console.log('inside addDoctor should not be undef=>', doctorsService);
  console.log('add doctor: ', doctor);
}

/** @ngInject */
function controller($scope, $mdDialog, $mdConstant, doctorsService) {
  // Form setup
  $scope.keys = [
    $mdConstant.KEY_CODE.ENTER,
    $mdConstant.KEY_CODE.COMMA,
    $mdConstant.KEY_CODE.SPACE,
    $mdConstant.KEY_CODE.TAB
  ];

  $scope.doctor = {
    url: '',
    emailDefaultUser: true,
    emailList: []
  };

  // Dialog actions
  $scope.hide = () => $mdDialog.hide();
  $scope.cancel = () => $mdDialog.cancel();
  $scope.submit = (doctor) => addDoctor(doctorsService, doctor);
}

export function build(targetEvent) {
  return { controller, templateUrl, targetEvent, clickOutsideToClose: true };
}

export default build;
