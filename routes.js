const app = require('./index.js');
const db = require('./db');
const { reviewsQuery, ratingQuery, recommendQuery, photosQuery, addReviewQuery, helpfulQuery, reportQuery, characteristicsQuery, averageValueQuery } = require('./db/queries')

module.exports = {
  getReviews: async function(reviewsObj) {
    const reviews = await db.query(reviewsQuery(reviewsObj.product));
    const photos = await db.query(photosQuery(reviewsObj.product));

    reviews.rows.map((row) => {
      var individualReview = {
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
      reviewsObj.results.push(individualReview);
    });
    console.log(photos.rows)
    photos.rows.map((row) => {
      console.log(row.id);
      for (var i = 0; i < reviewsObj.results.length; i++) {
        if (row.id === reviewsObj.results[i].review_id) {
          reviewsObj.results[i].photos.push({
            id: row.photo_id,
            url: row.url
          })
        }
      }
    })
    return reviewsObj;
  },

  getMetadata: async function(product) {
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

    const characteristics = await db.query(characteristicsQuery(product));
    responseObj.characteristics = characteristics.rows
    // characteristics.rows.map(async function(row) {
    //   const average = await db.query(averageValueQuery(row.characteristic_id))
    //   responseObj.characteristics[row.name] = {
    //     id: row.characteristic_id,
    //     value: average.rows[0]
    //   }
      // console.log(responseObj.characteristics[row.name])
    console.log(responseObj);
    // return responseObj;
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

