const db = require('../db');

module.exports = {

  reviewsQuery: (product, sort, count) => {
   return `SELECT id, rating, date, summary, body, name, recommend, response, helpfulness
      FROM reviews WHERE product = ${product} ORDER BY ${sort === 'helpful' ? 'helpfulness' : 'date'} desc LIMIT ${count};`
  },

  photosQuery: (product) => {
    return `SELECT reviews.id, photos.photo_id, photos.url FROM reviews INNER JOIN photos ON review_id = reviews.id WHERE product = ${product};`
  },

  // ratingQuery: (product) => {
  //   return `SELECT rating FROM reviews WHERE product = ${product};`
  // },

  // recommendQuery: (product) => {
  //   return `SELECT COUNT(recommend) FROM reviews WHERE product = ${product} AND recommend = true;`
  // },

  metaDataQuery: (product) => {
    return `SELECT review_id, reviews.rating, reviews.recommend, characteristic_id, characteristics.name, characteristics.value FROM characteristics INNER JOIN reviews ON review_id = reviews.id WHERE product = ${product};`
  },

  // averageValueQuery: (id) => {
  //   return `SELECT AVG(value) FROM characteristics WHERE characteristic_id = ${id};`
  // },

  addReviewQuery: (review) => {
    const {product_id, rating, date, summary, body, recommend, name, email, photos, characteristics } = review;
    return `INSERT INTO reviews (product, rating, date, summary, body, recommend, name, email, helpfulness)
      VALUES(${product_id}, ${rating}, '${Date.now()}', '${summary}', '${body}', ${recommend}, '${name}', '${email}', 0);`;
  },

  reportQuery: (id) => {
    return `UPDATE reviews SET reported = true WHERE id = ${id};`
  },

  helpfulQuery: (id) => {
    return `UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id};`
  }
};