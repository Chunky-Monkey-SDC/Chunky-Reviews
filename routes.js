const app = require('./index.js');
const db = require('./db');
const { reviewsQuery, ratingQuery, recommendQuery, photosQuery, addReviewQuery, helpfulQuery, reportQuery, characteristicsQuery } = require('./db/queries')

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
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0
      },
      recommend: {},
      characteristics: {},
    };

    return Promise.all([db.query(ratingQuery(product)), db.query(recommendQuery(product)), db.query(characteristicsQuery(product))])
    .then((results) => {
      for (var i = 0; i < results[0].rows.length; i++) {
        responseObj.ratings[results[0].rows[i].rating] ++;
      }
      responseObj.recommend[true] = results[1].rows[0].count;
      responseObj.recommend[false] = Object.values(responseObj.ratings).reduce((accumulator, value) => {
        return Number(accumulator) + Number(value);
        }) - responseObj.recommend[true];
      results[2].rows.map((characteristic) => {
        if (!responseObj.characteristics[characteristic.name]) {
          const averageValue = [0, 0]
          for (var i = 0; i < results[2].rows.length; i ++) {
            if (characteristic.characteristic_id === results[2].rows[i].characteristic_id) {
              averageValue[0] ++ ;
              averageValue[1] += results[2].rows[i].value;
            }
          }
          responseObj.characteristics[characteristic.name] = {
            id: characteristic.characteristic_id,
            value: (averageValue[1] / averageValue[0])
        }}
      })
      return responseObj;
    })
    // .then((responseObj) => {
    //   for (var i = 0; i < responseObj.characteristics.length)
    // })

    // const ratingData = await db.query(ratingQuery(product));
    // for (var i = 0; i < ratingData.rows.length; i ++) {
    //   responseObj.ratings[ratingData.rows[i].rating] ++;
    // }

    // const totalRecommended = await db.query(recommendQuery(product));
    // responseObj.recommend[true] = totalRecommended.rows[0].count;
    // responseObj.recommend[false] = Object.values(responseObj.ratings).reduce((accumulator, value) => {
    //   return Number(accumulator) + Number(value);
    //   }) - responseObj.recommend[true];

    // async function getAverageValue(characteristic) {
    //   const {characteristic_id, name} = characteristic
    //   if (!responseObj.characteristics[name]) {
    //     const average = await db.query(averageValueQuery(characteristic_id))
    //     console.log(average.rows[0].avg)
    //     console.log(name)
    //     responseObj.characteristics[name] = {
    //       id: characteristic_id,
    //       // value: Number(average.rows[0].avg)
    //     }
    // }}
    // const characteristics = await db.query(characteristicsQuery(product));
    // characteristics.rows.map((row) => {
    //   getAverageValue(row);
    // });
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

