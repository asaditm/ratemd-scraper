/* eslint object-shorthand: 0 func-names: 0 */

import Sequelize from 'sequelize';

import { safelyParseJSON } from '../../utils';

export const Doctor = {
  name: 'doctors',
  schema: {
    siteId: { type: Sequelize.BIGINT, unique: true, allowNull: false },
    name: {
      type: Sequelize.STRING,
      set: function (value) {
        this.setDataValue('name', value.trim());
      }
    },
    reviewCount: Sequelize.INTEGER,
    rating: Sequelize.DECIMAL,
    bestRating: Sequelize.DECIMAL,
    worstRating: Sequelize.DECIMAL,
    url: { type: Sequelize.STRING, unique: true },
    emailList: {
      type: Sequelize.TEXT,
      get: function () {
        return safelyParseJSON(this.getDataValue('emailList')) || [];
      },
      set: function (value) {
        this.setDataValue('emailList', JSON.stringify(value));
      }
    }
  }
};

export default Doctor;
