export const development = {
  database: {
    username: 'admin',
    password: null,
    filename: 'database_dev.sqlite',
    forceCreation: process.env.FORCE_CREATE || false
  },

  log: {
    filename: 'server_dev.log',
    level: 'VERBOSE'
  }
};

export const production = {
  database: {
    username: 'admin',
    password: 'admin',
    filename: 'database_prod.sqlite'
  },

  log: {
    level: 'INFO',
    short: true
  }
};

export default { development, production };
