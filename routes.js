const app = require('./index.js');
const db = require('./db');
const { reviewsQuery, ratingQuery, recommendQuery, photosQuery, addReviewQuery, helpfulQuery, reportQuery } = require('./db/queries')

module.exports = {
  getReviews: (response) => {
    return db.query(reviewsQuery(response.product))
    .then((data) => {
      data.rows.map((row) => {
        var reviewObj = {
          review_id: row.id,
          rating: row.rating,
          summary: row.summary,
          recommend: row.recommend,
          response: row.response,
          body: row.body,
          date: Date(row.date),
          reviewer_name: row.name,
          helpfulness: row.helpfulness,
          photos: []
        };
        reviewIds.push(reviewObj.review_id);
        response.results.push(reviewObj);
      })
      return response;
    })
  },

  getMetadata: (product) => {
    async function generateResponse(product) {
      var responseObj = {
        product_id: product,
        ratings: {},
        recommend: {},
        characteristics: {},
      };
      for (var i = 1; i <= 5; i ++) {
        const ratingData = await db.query(ratingQuery(product, i));
        responseObj.ratings[i] = ratingData.rows[0].count;
      }
      const totalRecommended = await db.query(recommendQuery(product, true));
      responseObj.recommend[true] = totalRecommended.rows[0].count;
      responseObj.recommend[false] = Object.values(responseObj.ratings).reduce((accumulator, value) => {
          return Number(accumulator) + Number(value);
        }) - responseObj.recommend[true];
      // const characteristics = await db.query(characteristicsQuery(product));
      return responseObj;
    }
    return generateResponse(product);
  },

  addReview: (newReview) => {
    db.query(addReviewQuery(newReview))
    .then((res) => console.log(res))
    .catch((err) => console.log(err))
  },

  markHelpful: (id) => {
    db.query(helpfulQuery(id))
  },

  report: (id) => {
    db.query(reportQuery(id));
  }
}

