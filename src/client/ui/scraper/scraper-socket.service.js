const events = {
  scraper: ['enabled', 'disabled'],
  scrapeAll: ['start', 'finish', 'error'],
  scrape: ['start', 'finish', 'failed']
};

function extractAtion(event) {
  return event.substr(event.lastIndexOf(':') + 1, event.length);
}

export class ScraperSocket {
  /** @ngInject */
  constructor($rootScope, socketService, doctorsSocket) {
    this.rootScope = $rootScope;
    this.socket = socketService;
    this.activate();
  }

  activate() {
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
    data.hasNewReview = true;
    this.rootScope.$broadcast(`socket:scrape:${data.id}`, data);
  }
}

export default ScraperSocket;

