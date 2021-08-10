const { Client, Pool  } = require('pg');
const queries = require('queries');

const pool = new pool({
  user: 'camboucher',
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