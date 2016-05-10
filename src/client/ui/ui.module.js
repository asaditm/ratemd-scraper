import coreModule from '../core/core.module';
import doctorsModule from './doctors/doctors.module';

import toolbarComponent from './toolbar/toolbar';
import toolbarButtonComponent from './toolbar/button';


const dependencies = [
  coreModule,
  doctorsModule
];

const ui = angular
  .module('app.ui', dependencies)
  .component(toolbarComponent.name, toolbarComponent)
  .component(toolbarButtonComponent.name, toolbarButtonComponent);

export default ui.name;
