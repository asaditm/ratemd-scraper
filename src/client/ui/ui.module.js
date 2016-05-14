import coreModule from '../core/core.module';
import doctorsModule from './doctors/doctors.module';

import toolbarComponent from './toolbar/toolbar.component';
import toolbarButtonComponent from './toolbar/button.component';
import iconButtonComponent from './icon-button.component';

import scraperSocketService from './scraper/scraper-socket.service';
import scraperToggleComponent from './scraper/scraper-toggle.component';
import scrapeAllComponent from './scraper/scrape-all.component';

const dependencies = [
  coreModule,
  doctorsModule
];

const ui = angular
  .module('app.ui', dependencies)
  .service('scraperSocket', scraperSocketService)
  .component(toolbarComponent.name, toolbarComponent)
  .component(toolbarButtonComponent.name, toolbarButtonComponent)
  .component(iconButtonComponent.name, iconButtonComponent)
  .component(scraperToggleComponent.name, scraperToggleComponent)
  .component(scrapeAllComponent.name, scrapeAllComponent);

export default ui.name;
