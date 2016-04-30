import { join } from 'path';

export default {

  title: 'RateMDs Scraper',

  env: process.env.NODE_ENV || 'development',

  port: process.env.PORT || 6969,

  paths: {
    static: join(__dirname, '../../..', 'static'),
    data: join(__dirname, '../../../static', 'data')
  },

  database: {
    options: {
      dialect: 'sqlite',
      storage: join(__dirname, '../../../static', 'data'),
    },
    name: 'ratemds',
    username: 'admin',
    password: null,
    filename: 'database.sqlite',
    forceCreation: false
  },

  log: {
    filename: 'server.log',
    level: 'INFO',
    short: false,
    default: 'INFO'
  },

  secrets: {
    session: 'PleaseReplaceMe'
  },

  scraper: {
    interval: 5 // minutes
  },

  email: {
    domain: 'your.domain.ca',
    apiKey: 'mailgunApiKey',
    from: 'Review Alert <noreply@admin.com>',
    subject: 'New review was posted',
    body: 'This is a sample email',
    html: '<b>Sample test</b>'
  }

};
