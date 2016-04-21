/* eslint-disable */

/**
 * Setup the enviroment to run the tests
 */
var jsdom = require('jsdom').jsdom;
var mocha = require('mocha');

global.document = jsdom('<html><head><script></script></head><body></body></html>');
global.window = global.document.defaultView;
global.navigator = window.navigator = {};
global.Node = window.Node;

delete require.cache[require.resolve('angular')];
delete require.cache[require.resolve('angular/angular')];
delete require.cache[require.resolve('angular-mocks')];

require('angular/angular');

global.angular = window.angular;

/**
 * This needs to be called when ngMock is required.
 * Can be called in the initial test file, or in each test file only when using ngMock.
 */
function setupMock() {
  delete require.cache[require.resolve('angular')];
  delete require.cache[require.resolve('angular/angular')];
  delete require.cache[require.resolve('angular-mocks')];

  require('angular/angular');
  global.angular = window.angular;

  window.mocha = true;
  window.beforeEach = beforeEach;
  window.afterEach = afterEach;

  require('angular-mocks/angular-mocks');
  global.inject = global.angular.mock.inject;
  global.ngModule = global.angular.mock.module;
}

global.setup = setupMock;
