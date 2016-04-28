/* eslint object-shorthand: 0 func-names: 0 */

import Sequelize from 'sequelize';

function arrayToJSON(array) {
  return JSON.stringify(array);
}

function emailListToJSON(model) {
  model.emailList = arrayToJSON(model.emailList);
}

function ratingBreakdownToJSON(model) {
  model.ratingBreakdown = arrayToJSON(model.ratingBreakdown);
}

function safelyParseJSON(json) {
  if (!json) {
    return '';
  }
  try {
    return JSON.parse(json);
  } catch (err) {
    console.log('Could not parse JSON', json, err);
  }
}

export const Doctor = {
  name: 'doctors',
  schema: {
    siteId: { type: Sequelize.BIGINT, unique: true, allowNull: false },
    name: Sequelize.STRING,
    reviewCount: Sequelize.INTEGER,
    rating: Sequelize.DECIMAL,
    bestRating: Sequelize.DECIMAL,
    worstRating: Sequelize.DECIMAL,
    url: { type: Sequelize.STRING, unique: true },
    emailList: {
      type: Sequelize.TEXT,
      get: function () {
        safelyParseJSON(this.getDataValue('emailList'));
      }
    }
  },
  methods: {
    hooks: {
      beforeCreate: emailListToJSON,
      beforeUpdate: emailListToJSON
    }
  }
};

export const Review = {
  name: 'review',
  schema: {
    reviewId: Sequelize.STRING,
    author: Sequelize.STRING,
    rating: Sequelize.DECIMAL,
    ratingBreakdown: {
      type: Sequelize.TEXT,
      get: function () {
        safelyParseJSON(this.getDataValue('ratingBreakdown'));
      }
    },
    comment: Sequelize.TEXT,
    created: Sequelize.STRING
  },
  methods: {
    hooks: {
      beforeCreate: ratingBreakdownToJSON,
      beforeUpdate: ratingBreakdownToJSON
    }
  }
};

export default Doctor;
