const app = require('./index.js');
const db = require('./db');
const { reviewsQuery, photosQuery, metaDataQuery, addReviewQuery, helpfulQuery, reportQuery } = require('./db/queries')

module.exports = {
  getReviews: async function(reviewsObj, sort) {
    const { product, count } = reviewsObj;
    const reviews = await db.query(reviewsQuery(product, sort, count));
    const photos = await db.query(photosQuery(product));

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
    photos.rows.map((row) => {
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
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      recommend: {
        true: 0,
        false: 0
      },
      characteristics: {},
    };
    const data = await db.query(metaDataQuery(product));
    data.rows.map((row) => {
      var reviews = []
      if (reviews.indexOf(row.review_id === -1)) {
        reviews.push(row.review_id)
        responseObj.ratings[row.rating] ++ ;
        responseObj.recommend[row.recommend] ++ ;
      };
      if (!responseObj.characteristics[row.name]) {
        const averageValue = [0, 0]
        for (var i = 0; i < data.rows.length; i ++) {
          if (row.characteristic_id === data.rows[i].characteristic_id) {
            averageValue[0] ++ ;
            averageValue[1] += data.rows[i].value;
          }
        }
        responseObj.characteristics[row.name] = {
          id: row.characteristic_id,
          value: (averageValue[1] / averageValue[0])
        }
      };
    });
    return responseObj;
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

