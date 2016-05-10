/**
 * Core module which contains all of the apps deps
 */

import angular from 'angular';

import 'angular-material/angular-material.min.css';
import 'font-awesome/css/font-awesome.min.css';
// import 'normalize.css/normalize.css';
import './core.scss';

// Core vendor libs
import ngAnimate from 'angular-animate';
import ngUiRouter from 'angular-ui-router';
import ngMaterial from 'angular-material';
import ngIcons from 'angular-material-icons';

import config from './core.config';
import materialTheme from './theme.config';

const dependencies = [
 /* Angular modules */
  ngAnimate,
  ngMaterial,

 /* Cross-app modules */

 /* 3rd party modules */
  ngUiRouter,
  ngIcons
];

export const module =
  angular
    .module('app.core', dependencies)
    .config(config)
    .config(materialTheme);

export default module.name;
