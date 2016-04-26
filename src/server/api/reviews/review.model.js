import Sequelize from 'sequelize';

export default {
  name: 'reviews',
  schema: {
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
