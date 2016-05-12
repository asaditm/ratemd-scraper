import templateUrl from './add-dialog.tpl.html';

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

  function urlChanged(value) {
    if ($scope.error) {
      $scope.error = '';
      $scope.doctorForm.url.$setValidity('scraper', true);
    }
  }

  function addDoctor(doctor) {
    $scope.loading = true;
    $scope.error = '';

    doctorsService.create(doctor).then((result) => {
      $scope.loading = false;
      $mdDialog.hide(result);
    }).catch((err) => {
      $scope.loading = false;
      $scope.error = err || 'Entered url is invalid';
      $scope.doctorForm.url.$setValidity('scraper', false);
    });
    // TODO If it is okay, then display message telling user that data will be eventually loaded
    // TODO a toast maybe?
    console.log('inside addDoctor should not be undef=>', doctorsService);
    console.log('add doctor: ', doctor);
  }

  $scope.urlChanged = urlChanged;
  $scope.submit = (doctor) => addDoctor(doctor);
}

export function build(targetEvent) {
  return { controller, templateUrl, targetEvent, clickOutsideToClose: true };
}

export default build;
