import ScraperService from './service';
import logger from '../logger';

const service = new ScraperService();
const log = logger.create('Scraper');

const MINUTE_IN_MILLIS = 60000;
const DEFAULT_INTERVAL = 5;

let serviceHandler = null;

export function start(interval = DEFAULT_INTERVAL) {
  if (serviceHandler) {
    return;
  }
  log.info(`Scheduling scraper for every ${interval} minutes`);
  serviceHandler = setInterval(() => service.all(), interval * MINUTE_IN_MILLIS);

  return service.all();
}

export function stop() {
  if (serviceHandler) {
    log.info('Stopping the scrapper service');
    clearInterval(serviceHandler);
    serviceHandler = null;
  }
}

export default {
  start,
  stop,
  single: service.single,
  all: service.all
};
