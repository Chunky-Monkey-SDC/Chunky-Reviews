const app = require('./index.js');
const db = require('./db');
const { reviewsQuery, getMetadata, photosQuery, addReview, helpfulQuery, reportQuery } = require('./db/queries')

module.exports = {
  getReviews: (response) => {
    var reviewIds = [];
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
    // .then((response) => {
    //   return reviewIds.map((id, i) => {
    //     db.query(photosQuery(id))
    //     .then((data) => {
    //       response.results[i].photos.push(data)
  },

  getMetadata: (product) => {
    async function generateResponse(product) {
      var responseObj = {}
      for (var i = 1; i <= 5; i ++) {
        const data = await db.query(`SELECT COUNT(rating) FROM reviews WHERE rating = ${i}`);
        responseObj[i] = data.rows[0].count;
      }
      return responseObj;
    }
    return generateResponse(product);
  },

  markHelpful: (id) => {
    db.query(helpfulQuery(id))
  },

  report: (id) => {
    db.query(reportQuery(id));
  }
}

// app.post('/reviews', (req, res) => {
//   db.query('')
//   res.send('Created');
// });

