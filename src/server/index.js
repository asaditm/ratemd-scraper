import { install } from 'source-map-support';
install();

import mkdirp from 'mkdirp-promise';
import PrettyError from 'pretty-error';

import config from './config';
import logger from './logger';

const pretty = new PrettyError();
const defaultConfig = config.defaults();
const log = logger.create('System', defaultConfig.log);

/**
 * Called when the node process is about to exit
 *
 * @param number code Return code of the process
 */
function onExit(code) {
  if (code >= 0) {
    log.warning(`Exit: Non-zero exit code of ${code}`);
  } else {
    log.out('Exit: Application is exiting normally');
  }
}
process.on('exit', onExit);

/**
 * Called when the user hits Ctrl-C
 */
function onCtrlC() {
  log.info('Exit: Ctrl-C has been captured');
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
  log.error('An uncaught exception has been thrown!', pretty.render(err));
  process.exit(1);
}
process.on('uncaughtException', onUncaughtException);

/**
 * Attempt to launch the server
 * catch and throw any errors
 */
try {
  const dataDir = config.defaults().paths.data;
  mkdirp(dataDir)
    .then(() => {
      log.info(`Using [${dataDir}] as data folder`);
      require('./server');
    });
} catch (err) {
  log.error('Something terrible has happened!', pretty.render(err));
}
