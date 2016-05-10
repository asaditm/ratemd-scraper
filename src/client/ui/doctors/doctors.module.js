import angular from 'angular';

import doctorsApiService from './doctors.service';
import doctorsListComponent from './list/doctors-list.component';

const depends = [];

export const doctors = angular
  .module('app.ui.doctors', depends)
  .service('doctorsService', doctorsApiService)
  .component(doctorsListComponent.name, doctorsListComponent);

export default doctors.name;
