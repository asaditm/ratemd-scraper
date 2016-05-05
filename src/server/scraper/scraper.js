import Xray from 'x-ray';

import { createHttpError, ensureHttpProtocol } from '../utils';

const x = Xray();
const defaultUrl = 'https://www.ratemds.com/doctor-ratings/';

class Scraper {
  fromDoctor(doctor) {
    return this.fromUrl(doctor.url);
  }

  fromUrl(url) {
    return this.fullScrape(url);
  }

  validate(url) {
    if (!url) {
      return Promise.reject(createHttpError('No URL was provided'));
    } else if (url.indexOf('ratemds.com') === -1) {
      return Promise.reject(createHttpError('Malformed url: Not from ratemds.com'));
    } else if (url.indexOf('doctor-ratings/') === -1) {
      return Promise.reject(createHttpError('Malformed url: Not a proper doctors profile url'));
    }

    const fields = { body: 'body @class', name: 'meta[property="og:title"] @content' };
    return this.scrape(ensureHttpProtocol(url), fields).then((result) => {
      if (result.body.trim() === '404') {
        throw createHttpError('Could not find a valid doctor at the provided URL');
      } else if (!result.name) {
        throw createHttpError('Could not parse the title value');
      }
      return Promise.resolve(result.name);
    })
    .catch((err) => {
      throw createHttpError('Something went wrong', err);
    });
  }

  fullScrape(url = -1) {
    if (url === -1) {
      return this;
    }

    const fields = {
      doctor: {
        name: 'meta[property="og:title"] @content',
        reviewCount: 'span[itemprop=aggregateRating] > span[itemprop=ratingCount]',
        rating: 'span[itemprop=aggregateRating] > meta[itemprop=ratingValue] @content',
        bestRating: 'span[itemprop=aggregateRating] > meta[itemprop=bestRating] @content',
        worstRating: 'span[itemprop=aggregateRating] > meta[itemprop=worstRating] @content',
      },
      review: {
        reviewId: 'span.ratings > span > div.rating @id',
        author: 'span[itemprop=author] > meta[itemprop=name] @content',
        rating: 'div[itemprop=reviewRating] > meta[itemprop=ratingValue] @content',
        ratingBreakdown: x('.rating-number', [{
          type: 'div.type',
          value: 'span.value'
        }]),
        comment: 'p[itemprop=reviewBody] > span',
        created: 'p.rating-comment-created > a'
      }
    };

    return this.scrape(url, fields);
  }

  scrape(url = defaultUrl, fields) {
    return new Promise((resolve, reject) => {
      if (url === defaultUrl) {
        return reject(createHttpError('Trying to scrape default URL'));
      }
      x(url, fields)((err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }
}

export default Scraper;

export function validate(id) {
  const scraper = new Scraper();
  return scraper.validate(id);
}
