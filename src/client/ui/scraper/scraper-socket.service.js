import { remove, merge } from 'lodash';

const events = {
  scraper: ['enabled', 'disabled'],
  scrapeAll: ['start', 'finish', 'error'],
  scrape: ['start', 'new', 'finish', 'failed']
};

export class ScraperSocket {
  /** @ngInject */
  constructor(socketService, doctorsSocket) {
    this.socket = socketService;
  }

  activate() {
    // TODO extra work?
    this.register();
  }

  register() {
    for (const event of events.scraper) {
      this.socket.get().on(`scraper:${event}`, () => this.onScraper(event));
    }
    for (const event of events.scrapeAll) {
      this.socket.get().on(`scrape:all:${event}`, (data) => this.onScrapeAll(event, data));
    }
    for (const event of events.scrape) {
      this.socket.get().on(`scrape:${event}`, (data) => this.onScrape(event, data));
    }
  }

  onScraper(event) {
    // Trigger a toggle somewhere?
    console.log(`[Scraper] has been ${event.indexOf('enabled') !== -1 ? 'enabled' : 'disabled'}`);
  }

  onScrapeAll(event, data) {
    // On start, start spinning the spinner
    // On finish & error, stop spinning spinner
    // Display a toast saying scraper started

    // On error display toast with error message
    console.log(`'ScrapeAll: ${event}: `, data);
  }

  onScrape(event, data) {
    // Start individual spinner based on ID
    // see onScrapeAll
    switch (event) {
      case 'scrape:start'.equals(event):
        break;
      case 'scrape:new'.equals(event):
        break;
      case 'scrape:finish'.equals(event):
        break;
      case 'scrape:failed'.equals(event):
        break;
      default:
        console.log(`[onScrape] unknown event: ${event}`, data);
    }
    console.log(`[onScrape] event: ${event}`, data);
  }

}

export default ScraperSocket;

