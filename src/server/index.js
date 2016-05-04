import { install } from 'source-map-support';
install();

import mkdirp from 'mkdirp-promise';
import PrettyError from 'pretty-error';

import defaults from './config/defaults';
import confg from './config';

const pretty = new PrettyError();

/**
 * Called when the node process is about to exit
 *
 * @param number code Return code of the process
 */
function onExit(code) {
  if (code >= 0) {
    console.info('==>   EXIT: Non-zero exit code of %s', code);
  } else {
    console.info('==>   EXIT: Server is exiting normally');
  }
}
process.on('exit', onExit);

/**
 * Called when the user hits Ctrl-C
 */
function onCtrlC() {
  console.info('==>   EXIT: Ctrl-C has been captured');
  process.exit(-1);
}
process.on('SIGINT', onCtrlC);

/**
 * Called when an uncaught exception is thrown.
 * The server is wrapped in a try catch, that will throw it's error
 * to be caught here
 *
 * @param object err  Error object
 */
function onUncaughtException(err) {
  console.error('==>    ERROR: An exception has been thrown');
  console.error(err.stack);
  process.exit(1);
}
process.on('uncaughtException', onUncaughtException);

/**
 * Attempt to launch the server
 * catch and throw any errors
 */
try {
  // TODO init logger
  mkdirp(defaults.paths.data)
    .then(() => require('./server'));
} catch (err) {
  console.error('==>    ERROR: Error has been encountered in the server script');
  console.error(pretty.render(err));
  throw err;
}
