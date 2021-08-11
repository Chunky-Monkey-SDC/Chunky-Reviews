var express = require('express');

const app = express();
const port = 6969;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

exports = app;