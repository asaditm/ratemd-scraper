import angular from 'angular';

import core from '../core/core.module';
import ui from '../ui/ui.module';

import routes from './config.routes';

const depends = [core, ui];

export const config =
  angular
    .module('app.config', depends)
    .config(routes);

export default config.name;
