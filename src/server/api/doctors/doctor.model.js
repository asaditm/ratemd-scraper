import Sequelize from 'sequelize';

export const Doctor = {
  name: 'doctors',
  schema: {
    siteId: { type: Sequelize.BIGINT, unique: true, allowNull: false },
    name: Sequelize.STRING,
    reviewCount: Sequelize.INTEGER,
    rating: Sequelize.DECIMAL,
    bestRating: Sequelize.DECIMAL,
    worstRating: Sequelize.DECIMAL,
    url: Sequelize.STRING,
    emailList: Sequelize.TEXT
  }
};

export const Review = {
  name: 'review',
  schema: {
    reviewId: Sequelize.STRING,
    author: Sequelize.STRING,
    rating: Sequelize.DECIMAL,
    staff: Sequelize.DECIMAL,
    punctuality: Sequelize.DECIMAL,
    helpfulness: Sequelize.DECIMAL,
    knowledge: Sequelize.DECIMAL,
    comment: Sequelize.TEXT,
    created: Sequelize.STRING
  }
};

export default Doctor;
