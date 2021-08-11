const app = require('./index.js');
const db = require('./db');
const { getReviews, getMetadata, addReview, markHelpful, report } = require('./db/queries')

app.get('/reviews', (req, res) => {
  const { product, page, count } = req.params

  var response = {
    product: product,
    page: page,
    count: count,
    results: [];
  };

  getReviews(product)
  .then((data) => {
      res.rows.map((row) => {
        var reviewObj = {
          review_id: row.id,
          rating: row.rating,
          summary: row.summary,
          recommend: row.recommend,
          response: row.response,
          body: row.body,
          date: Date(row.date);,
          reviewer_name: row.name,
          helpfulness: row.helpfulness,
          photos: [];
        };
        getPhotos(row.id)
        .then(data) => {
          res.rows.map((row) => {
            reviewObj.photos.push({
              id: row.id,
              url: row.url
          })});
          response.results.push(reviewObj);
  }})})
  .then((data) => { res.send(response)) };
}};

app.get('/reviews/meta', (req, res) => {
  res.send('Getting review metadata');
});

app.post('/reviews', (req, res) => {
  db.query('')
  res.send('Created');
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  const { id } = req.params;
  markHelpful(id);
  .then((res) => { res.send('Review marked as helpful') };
  .catch((err) => console.log(err));
});

app.put('/reviews/:review_id/reported', (req, res) => {
  const { id } = req.params;
  //function that sends query to db to increment helpful 1
  report(id);
  .then((res) => { res.send('Review reported') };
});

