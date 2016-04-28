import Xray from 'x-ray';

const x = Xray();

const websiteUrl = 'https://www.ratemds.com/doctor-ratings/';

export function extractId(url) {
  const id = url.split('doctor-ratings/')[1];
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
    return this.scrape(extractId(url));
  }

  fromId(id) {
    return this.scrape(id);
  }

  scrape(doctorId = -1) {
    if (doctorId === -1) {
      return this;
    }

    return new Promise((resolve, reject) => {
      const scrapeUrl = websiteUrl + doctorId + '/';
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
