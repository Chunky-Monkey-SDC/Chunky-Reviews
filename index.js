var express = require('express');
var db = require('./db');

const app = express();
const port = 6969;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.get('/reviews', (req, res) => {
  res.send('Getting reviews!');
});

app.get('/reviews/meta', (req, res) => {
  res.send('Getting review metadata');
});

app.post('/reviews', (req, res) => {
  res.send('Created');
});

app.put('/reviews/*/helpful', (req, res) => {
  res.send('Review marked as helpful');
});

app.put('/reviews/*/reported', (req, res) => {
  res.send('Review marked as helpful');
});

