var Xray = require('x-ray');
var util = require('util');

const scrape = Xray();
const url = 'https://www.ratemds.com/doctor-ratings/71428/Dr-Duane-Pochylko-Saskatoon-SK.html';

scrape(url, {
  name: 'h1[itemprop=name]',
  overall: {
    stars: '.search-item-info > span.star-rating @title',
    worst: 'span[itemprop=aggregateRating] > meta[itemprop=worstRating] @content',
    best: 'span[itemprop=aggregateRating] > meta[itemprop=bestRating] @content',
    average: 'span[itemprop=aggregateRating] > meta[itemprop=ratingValue] @content',
    count: 'span[itemprop=aggregateRating] > span[itemprop=ratingCount]'
  },
  latest: {
    author: 'span[itemprop=author] > meta[itemprop=name] @content',
    value: 'div[itemprop=reviewRating] > meta[itemprop=ratingValue] @content',
    breakdown: scrape('.rating-number', [{
      type: 'div.type',
      value: 'span.value'
    }]),
    comment: 'p[itemprop=reviewBody] > span',
    date: 'p.rating-comment-created > a'
  }
})(function (err, obj) {
  obj.latest.breakdown = obj.latest.breakdown.slice(0, 4);
  console.log(util.inspect(obj, { showHidden: false, depth: null }));
});