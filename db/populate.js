var db = require('./connection.js');

//this file is used to create the initial tables in the database with the intended schema

const createTables = () => {
  return db.query(
  `CREATE TABLE reviews(
    id integer PRIMARY KEY,
    product integer,
    rating integer,
    summary varchar(60),
    recommended boolean,
    name varchar,
    helpfulness integer,
    reported boolean,
    email varchar,
    body varchar(1000),
    response varchar,
    date timestamp
  );`)
  .then((res) => {
    return db.query(
    `CREATE TABLE photos(
      id integer PRIMARY KEY,
      url varchar,
      review_id integer,
        CONSTRAINT fk_review
        FOREIGN KEY(review_id) REFERENCES reviews(id)
  );`)})
  .then((res) => {
    return db.query(
    `CREATE TABLE characteristics (
      id integer PRIMARY KEY,
      name varchar,
      value integer,
      review_id integer,
      CONSTRAINT fk_review
        FOREIGN KEY(review_id) REFERENCES reviews(id)
    );`
  )})
  .then((res) => console.log(res))
  .catch(err => console.log(err))
};

createTables();