/* eslint object-shorthand: 0 func-names: 0 */

import Sequelize from 'sequelize';

import { safelyParseJSON } from '../../utils';

export const Review = {
  name: 'review',
  schema: {
    reviewId: Sequelize.STRING,
    author: Sequelize.STRING,
    rating: Sequelize.DECIMAL,
    ratingBreakdown: {
      type: Sequelize.TEXT,
      get: function () {
        return safelyParseJSON(this.getDataValue('ratingBreakdown')) || [];
      },
      set: function (value) {
        let breakdown = [];
        if (value.length > 4) {
          breakdown = value.slice(0, 4);
        } else {
          breakdown = value;
        }
        this.setDataValue('ratingBreakdown', JSON.stringify(breakdown));
      }
    },
    comment: Sequelize.TEXT,
    created: Sequelize.STRING
  }
};

export default Review;
