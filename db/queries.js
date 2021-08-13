const db = require('../db');

module.exports = {

  reviewsQuery: (id) => {
    return `SELECT id, rating, date, summary, body, name, recommend, response, helpfulness FROM reviews WHERE product = ${id};`
  },

  photosQuery: (id) => {
    return `SELECT id, url FROM photos WHERE photos.review_id = ${id};`
  },

  // getMetadata: (id, callback) => {
  //   const metaData = {};
  //   db.query(`SELECT rating, COUNT(recommend) FROM reviews WHERE product = ${id}`)
  //   .then((res))
  //   //need to get average rating, total recommendations, and characteristics (separate query);

  // },

  addReview: (review) => {
    const {product_id, rating, date, summary, body, recommend, name, email, photos, characteristics } = review;
    return `INSERT INTO reviews (product, rating, date, summary, body, recommend, name, email, helpfulness)
      VALUES( ${product_id}, ${rating}, ${Date.now().toString()}, ${body}, ${summary}, ${name}, ${email}, 0;`
  },

  reportQuery: (id) => {
    return `UPDATE reviews SET reported = true WHERE id = ${id};`
  },

  helpfulQuery: (id) => {
    return `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id};`
  }
};