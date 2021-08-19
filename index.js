var express = require('express');
const routes = require('./routes');

const app = express();
const port = 6969;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.get('/', (req, res) => {
  console.log('request received');
  res.send('request received');
})

app.get('/reviews', (req, res) => {
  const { product_id, sort = 'helpful', count = 5, page = 1 } = req.query
  var response = {
    product: product_id,
    page: page,
    count: count,
    results: [],
  };

  async function generateResponse(data, sort) {
    const responseObj = await routes.getReviews(data, sort)
    res.send(responseObj);
  }
  generateResponse(response, sort);
});

app.get('/reviews/meta', (req, res) => {
  const { product_id } = req.query
  async function getMetadata(product_id) {
    const responseObj = await routes.getMetadata(product_id);
    res.send(responseObj);
  }
  getMetadata(product_id);
});

app.post('/reviews', (req, res) => {
  const newReview = req.body;
  async function postReview(review) {
    await routes.addReview(review);
    res.send('Created');
  }
  postReview(newReview);

});

app.put('/reviews/:review_id/helpful', (req, res) => {
  const { review_id } = req.params;
  async function markHelpful(review_id) {
    await routes.markHelpful(review_id)
    res.send('Review marked as helpful')
  }
  markHelpful(review_id)
});

app.put('/reviews/:review_id/reported', (req, res) => {
  const { review_id } = req.params;
  async function reportReview(review_id) {
    await routes.report(review_id)
    res.send('Review reported')
  }
  reportReview(review_id);
},

app.get('/loaderio-a021896135270d4c988d3a617c8b0e29/', (req, res) => {
  res.send('loaderio-a021896135270d4c988d3a617c8b0e29');
})
);





