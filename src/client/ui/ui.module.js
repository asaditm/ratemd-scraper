/**
 * Module which contains all the sections of the ui
 *
 * Contains ui submodules for more complex components
 */

import angular from 'angular';

import core from '../core/core.module';

/** UI sub-modules */
import githubActivity from './github-activity/github-activity.module';

/** UI components */
import headerComponent from './header/header.component';

const dependencies = [
  core,
  githubActivity
];

const mod = angular
  .module('app.ui', dependencies)
  .component('header', headerComponent);

export default mod.name;
