var app = require('./index.js');

app.get('/reviews', (req, res) => {
  res.send('Getting reviews!');
});