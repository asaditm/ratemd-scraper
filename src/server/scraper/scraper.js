import Xray from 'x-ray';

import { createHttpError } from '../utils';

const x = Xray();

const websiteUrl = 'https://www.ratemds.com/doctor-ratings/';

export function extractId(url) {
  const id = url.split('doctor-ratings/')[1];
  if (!id) {
    return -1;
  }
  return id.substring(0, id.indexOf('/'));
}

class Scraper {
  fromDoctor(doctor) {
    if (doctor.siteId) {
      return this.fromId(doctor.siteId);
    } else if (doctor.url) {
      return this.fromUrl(doctor.url);
    }
  }

  fromUrl(url) {
    return this.fullScrape(extractId(url));
  }

  fromId(id) {
    return this.fullScrape(id);
  }

  validate(id = -1) {
    if (id.toString().length < 1 || id.toString().length > 6) {
      return Promise.reject(createHttpError(`Doctor id [${id}] is an invalid length`));
    }

    const fields = { body: 'body @class' };
    return this.scrape(id, fields).then((result) => {
      if (result.body.trim() === '404') {
        throw createHttpError(`Doctor id [${id}] is not a valid doctor on RateMds`);
      }
      return Promise.resolve(true);
    });
  }

  fullScrape(id = -1) {
    if (id === -1) {
      return this;
    }

    const fields = {
      doctor: {
        name: 'h1[itemprop=name]',
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

    return this.scrape(id, fields);
  }

  scrape(id = -1, fields) {
    if (id === -1) {
      return this;
    }
    return new Promise((resolve, reject) => {
      const scrapeUrl = `${websiteUrl}${id}/`;
      x(scrapeUrl, fields)((err, result) => {
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
