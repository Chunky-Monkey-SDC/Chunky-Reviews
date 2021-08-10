var express = require('express');
var db = require('./db/connection.js');

exports.app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

