const db = require('../db');

module.exports = {

  reviewsQuery: (product) => {
    return `SELECT id, rating, date, summary, body, name, recommend, response, helpfulness
      FROM reviews WHERE product = ${product};`
  },

  photosQuery: (review_id) => {
    return `SELECT id, url FROM photos WHERE photos.review_id = ${review_id};`
  },

  ratingQuery: (product, rating) => {
    return `SELECT COUNT(rating) FROM reviews WHERE product = ${product} AND rating = ${rating};`
  },

  recommendQuery: (product, bool) => {
    return `SELECT COUNT(recommend) FROM reviews WHERE product = ${product} AND recommend = ${bool};`
  },

  // characteristicsQuery: (product) => {
  //   return `SELECT `
  // },

  // getMetadata: (id, callback) => {
  //   const metaData = {};
  //   db.query(`SELECT rating, COUNT(recommend) FROM reviews WHERE product = ${id}`)
  //   .then((res))
  //   //need to get ratings, total recommendations, and characteristics (separate query);

  // },

  addReviewQuery: (review) => {
    const {product_id, rating, date, summary, body, recommend, name, email, photos, characteristics } = review;
    return `INSERT INTO reviews (product, rating, date, summary, body, recommend, name, email, helpfulness)
      VALUES(${product_id}, ${rating}, ${Date.now().toString()}, ${summary}, ${body}, ${recommend}, ${name}, ${email}, 0;`
  },

  reportQuery: (id) => {
    return `UPDATE reviews SET reported = true WHERE id = ${id};`
  },

  helpfulQuery: (id) => {
    return `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id};`
  }
};