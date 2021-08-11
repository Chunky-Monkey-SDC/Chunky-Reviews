const app = require('./index.js');
const db = require('./db');
const { getReviews, getMetadata, addReview, markHelpful, report } = require('./db/queries')

app.get('/reviews', (req, res) => {
  getReviews(id)
  res.send('Getting reviews!');
  //
});

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

