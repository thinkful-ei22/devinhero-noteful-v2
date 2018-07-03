'use strict';

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || 'postgres://lddnvemh:DDCoLuRydX8eYQm-3zReJi1W7pMc4YYg@baasu.db.elephantsql.com:5432/lddnvemh',
    debug: true, // http://knexjs.org/#Installation-debug
    pool: { min: 1, max: 2 }
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
