/**
 * Main Section
 *
 * Consists of a single component that uses directives/components from
 * the UI module
 */

import angular from 'angular';

import core from '../core/core.module';

import routes from './main.routes';
import mainComponent from './main.component';

const dependencies = [
  core
];

export const module =
  angular
    .module('app.main', dependencies)
    .config(routes)
    .component('main', mainComponent);

export default module.name;
