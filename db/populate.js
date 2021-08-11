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


