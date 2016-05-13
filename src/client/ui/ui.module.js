import coreModule from '../core/core.module';
import doctorsModule from './doctors/doctors.module';

import toolbarComponent from './toolbar/toolbar.component';
import toolbarButtonComponent from './toolbar/button.component';
import iconButtonComponent from './icon-button.component';

import scraperSocketService from './scraper/scraper-socket.service';

const dependencies = [
  coreModule,
  doctorsModule
];

const ui = angular
  .module('app.ui', dependencies)
  .service('scraperSocket', scraperSocketService)
  .component(toolbarComponent.name, toolbarComponent)
  .component(toolbarButtonComponent.name, toolbarButtonComponent)
  .component(iconButtonComponent.name, iconButtonComponent);

export default ui.name;
