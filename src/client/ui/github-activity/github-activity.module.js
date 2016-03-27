/**
 * Contained module that gets information from the
 * GitHub api and displays it nicely as a card
 */
import angular from 'angular';

import angularMoment from 'angular-moment';

import service from './github-api.service';
import activity from './activity-view/activity.component';
import commitStatus from './commit-status/commit-status.component';
import { branch, reverse } from './misc.filter';

const dependencies = [
  angularMoment.name
];

export const mod = angular
    .module('app.ui.githubActivity', dependencies)
    .service('githubApi', service)
    .component('githubActivity', activity)
    .component('commitStatus', commitStatus)
    .filter('branch', branch)
    .filter('reverse', reverse);

export default mod.name;
