const db = require('../db');

//the first four statements copy CSV data into the tables. the file paths may need to be altered

const etlProcess = () => {
  db.query(`copy reviews(id, product, rating, date, summary, body, recommend, reported, name, email, response, helpfulness)
    FROM ../../sdc-data/reviews.csv'
    DELIMITER ',' CSV HEADER;`);
  .then((res) => {
    db.query(`copy photos(id, review_id, url)
      FROM '../../sdc-data/raw_chars.csv'
      DELIMITER ',' CSV HEADER;`);
  })
  .then((res) => {
    db.query(`copy raw_chars(id, product, name)
      FROM '../../sdc-data/raw_chars.csv'
      DELIMITER ',' CSV HEADER;`);
  })
  .then((res) => {
    db.query(`copy characteristics(id, characteristic_id, review_id, value)
      FROM '../../sdc-data/characteristics.csv'
      DELIMITER ',' CSV HEADER;`);
  })
  .then((res) => {
    //this last statement adds the characteristic name to the characteristics table from the raw_chars table
    db.query(`UPDATE characteristics SET name =
      (SELECT name FROM raw_chars
      WHERE characteristics.characteristic_id = raw_chars.id);`);
  })
  .catch((err) => console.log(err));



