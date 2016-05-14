import angular from 'angular';

import doctorsApiService from './doctors.service';
import doctorsSocketService from './doctors-socket.service';
import doctorsListComponent from './list/doctors-list.component';
import doctorListItemComponent from './list/list-item.component';
import itemQuickActionsComponent from './list/quick-actions.component';

const depends = [];

export const doctors = angular
  .module('app.ui.doctors', depends)
  .service('doctorsService', doctorsApiService)
  .service('doctorsSocket', doctorsSocketService)
  .component(doctorsListComponent.name, doctorsListComponent)
  .component(doctorListItemComponent.name, doctorListItemComponent)
  .component(itemQuickActionsComponent.name, itemQuickActionsComponent);

export default doctors.name;
