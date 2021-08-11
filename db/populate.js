var db = require('../db');

//this file is used to create the initial tables in the database with the intended schema

const createTables = () => {
  return db.query(
  `CREATE TABLE reviews(
    id INTEGER PRIMARY KEY,
    product INTEGER,
    rating INTEGER,
    date VARCHAR,
    summary VARCHAR,
    body VARCHAR(1000),
    recommend BOOLEAN,
    reported BOOLEAN,
    name VARCHAR,
    email VARCHAR,
    response VARCHAR,
    helpfulness INTEGER
  );`)
  .then((res) => {
    return db.query(
    `CREATE TABLE photos(
      id INTEGER PRIMARY KEY,
      review_id INTEGER,
      url VARCHAR,
        CONSTRAINT fk_review
        FOREIGN KEY(review_id) REFERENCES reviews(id)
  );`)})
  .then((res) => {
    return db.query(
    `CREATE TABLE characteristics (
      id integer PRIMARY KEY,
      characteristic_id INTEGER,
      review_id INTEGER,
      value INTEGER,
      name VARCHAR,
      CONSTRAINT fk_review
        FOREIGN KEY(review_id) REFERENCES reviews(id)
    );`
  )})
  .then((res) => {
    return db.query(
      `CREATE TABLE raw_chars (
        id INTEGER PRIMARY KEY,
        product INTEGER,
        name VARCHAR
      );`
    )
  })
  .then((res) => console.log(res))
  .catch(err => console.log(err))
};

createTables();


/*
===================
ETL copy statements
===================

psql -d chunky-reviews -U camboucher -c "\copy reviews(id, product, rating, date, summary, body, recommend, reported, name, email, response, helpfulness) FROM reviews.csv' DELIMITER ',' CSV HEADER;"

psql -d chunky-reviews -U camboucher -c "\copy photos(id, review_id, url) FROM 'raw_chars.csv' DELIMITER ',' CSV HEADER;"

psql -d chunky-reviews -U camboucher -c "\copy raw_chars(id, product, name) FROM 'raw_chars.csv' DELIMITER ',' CSV HEADER;"

psql -d chunky-reviews -U camboucher -c "\copy characteristics(id, characteristic_id, review_id, value) FROM 'characteristics.csv' DELIMITER ',' CSV HEADER;"

//this last statement adds the characteristic name to the characteristics table from the raw_chars table

UPDATE characteristics SET name = (SELECT name FROM raw_chars WHERE characteristics.characteristic_id = raw_chars.id);

*/


