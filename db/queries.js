const db = require('../db');

module.exports = {

  reviewsQuery: (product) => {
    return `SELECT id, rating, date, summary, body, name, recommend, response, helpfulness
      FROM reviews WHERE product = ${product};`
  },

  photosQuery: (product) => {
    return `SELECT reviews.id, photos.photo_id, photos.url FROM reviews INNER JOIN photos ON review_id = reviews.id WHERE product = ${product};`
  },

  ratingQuery: (product) => {
    return `SELECT rating FROM reviews WHERE product = ${product};`
  },

  recommendQuery: (product, bool) => {
    return `SELECT COUNT(recommend) FROM reviews WHERE product = ${product} AND recommend = ${bool};`
  },

  characteristicsQuery: (product) => {
    return `SELECT characteristic_id, characteristics.name FROM characteristics INNER JOIN reviews ON review_id = reviews.id WHERE product = ${product};`
  },

  averageValueQuery: (id) => {
    return `SELECT AVG(value) FROM characteristics WHERE characteristic_id = ${id};`
  },

  addReviewQuery: (review) => {
    const {product_id, rating, date, summary, body, recommend, name, email, photos, characteristics } = review;
    // console.log(`INSERT INTO reviews (product, rating, date, summary, body, recommend, name, email, helpfulness)
    //   VALUES(${product_id}, ${rating}, '${Date.now()}', ${summary}, ${body}, ${recommend}, ${name}, ${email}, 0);`);
    return `INSERT INTO reviews (product, rating, date, summary, body, recommend, name, email, helpfulness)
      VALUES(${product_id}, ${rating}, '${Date.now()}', ${summary}, ${body}, ${recommend}, ${name}, ${email}, 0);`;
  },

  reportQuery: (id) => {
    return `UPDATE reviews SET reported = true WHERE id = ${id};`
  },

  helpfulQuery: (id) => {
    return `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id};`
  }
};