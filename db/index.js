const { Client, Pool  } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'ec2-3-23-130-188.us-east-2.compute.amazonaws.com',
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