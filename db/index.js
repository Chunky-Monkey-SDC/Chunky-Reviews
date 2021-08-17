const { Client, Pool  } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'chunky-reviews',
  password: 'password',
  port: 5432,
});

pool.connect();

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback)
  },
}