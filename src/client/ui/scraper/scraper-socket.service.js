import { remove, merge } from 'lodash';

// Index
// scraper:enabled
// scraper:disabled

// All
// scrape:all:start
// scrape:all:finish
// scrape:all:error :error

// Single
// scrape:start :id
// scrape:new :id
// scrape:finish :id
// scrape:failed :err/doctor.id

export class ScraperSocket {
  /** @ngInject */
  constructor(socketService, doctorsSocket) {
    this.socket = socketService;
    this.Doctor = doctorsSocket;
  }

  activate() {
  }

  register() {
  }

}

export default ScraperSocket;

