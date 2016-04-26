import Sequelize from 'sequelize';

export default {
  name: 'doctors',
  schema: {
    name: Sequelize.STRING,
    reviewCount: Sequelize.INTEGER,
    rating: Sequelize.DECIMAL,
    bestRating: Sequelize.DECIMAL,
    worstRating: Sequelize.DECIMAL,
    siteId: Sequelize.BIGINT,
    url: Sequelize.STRING
  }
};
