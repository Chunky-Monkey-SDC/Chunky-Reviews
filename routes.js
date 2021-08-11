const app = require('./index.js');
const db = require('./db');

app.get('/reviews', (req, res) => {
  res.send('Getting reviews!');
  //
});

app.get('/reviews/meta', (req, res) => {
  res.send('Getting review metadata');
});

app.post('/reviews', (req, res) => {
  res.send('Created');
});

app.put('/reviews/:review_id/helpful', (req, res) => {
  const { id } = req.params;
  db.query(`UPDATE reviews SET reported = true WHERE id = ${id}`)
  .then((res) => { res.send('Review marked as helpful') };
  res.send('Review marked as helpful');
});

app.put('/reviews/:review_id/reported', (req, res) => {
  const { id } = req.params;
  //function that sends query to db to increment helpful 1
  db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${id}`)
  .then((res) => { res.send('Review marked as helpful') };
});

