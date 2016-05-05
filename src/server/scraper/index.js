import ScraperService from './service';
import logger from '../logger';

const service = new ScraperService();
const log = logger.create('Scraper');

const MINUTE_IN_MILLIS = 60000;
const DEFAULT_INTERVAL = 5;

let serviceHandler = null;
let previousInterval = DEFAULT_INTERVAL;

export function start(interval = previousInterval) {
  if (!serviceHandler) {
    previousInterval = interval;
    log.info(`Scheduling scraper for every [${previousInterval}] minutes`);
    serviceHandler = setInterval(() => service.all(), previousInterval * MINUTE_IN_MILLIS);
    service.all();
  }
  return serviceHandler;
}

export function stop() {
  if (serviceHandler) {
    log.info('Stopping the scrapper service');
    clearInterval(serviceHandler);
    serviceHandler = null;
  }
  return serviceHandler;
}

export function toggle() {
  return serviceHandler ? stop() : start();
}

export default {
  start,
  stop,
  toggle,
  single: service.single,
  all: service.all
};
