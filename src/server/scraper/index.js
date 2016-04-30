import ScraperService from './service';

const service = new ScraperService();

const MINUTE_IN_MILLIS = 60000;
const DEFAULT_INTERVAL = 5;

let serviceHandler = null;

export function start(interval = DEFAULT_INTERVAL) {
  if (serviceHandler) {
    return;
  }
  console.log(`Scheduling scraper for every ${interval} minutes`);
  serviceHandler = setInterval(() => service.all(), interval * MINUTE_IN_MILLIS);

  return service.all();
}

export function stop() {
  if (serviceHandler) {
    console.log('Canceling scrapper service');
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
