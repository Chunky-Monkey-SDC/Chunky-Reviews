const db = require('../db');

module.exports = {

  getReviews: (id, callback) => {
    db.query(`SELECT id, rating, date, summay, body, name, recommend, response, helpfulness FROM reviews WHERE product = ${id}`)
    .then((res) => callback(res.rows));
    .catch((err) => console.log(err));
  },

  getPhotos: (id)

  getMetadata (id, callback) => {
    db.query('SELECT SUM(rating) FROM reviews WHERE ')
    //need to get average rating, total recommendations, and characteristics (separate query);

  },

  addReview: (review) => {
    const {product_id, rating, date body, summary, body, recommend, name, email, photos, characteristics } = review;
    db.query(`INSERT INTO reviews (product, rating, date, summary, body, recommend, name, email, helpfulness)
      VALUES( ${product_id}, ${rating}, ${Date.now().toString()}, ${body}, ${summary}, ${name}, ${email}, 0`)
    .catch((err) => console.log(err))
  },

  report: (id) => {
    db.query(`UPDATE reviews SET reported = true WHERE id = ${id}`)
    .catch((err) => console.log(err))
  },

  markHelpful: (id) => {
    db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id}`)
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  }
};