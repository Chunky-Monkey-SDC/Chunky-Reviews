var express = require('express');
const routes = require('./routes');

const app = express();
const port = 6969;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

app.get('/', (req, res) => {
  console.log('request received');
})

app.get('/reviews', (req, res) => {
  const { product_id, page = 1, count = 5 } = req.query
  var response = {
    product: product_id,
    page: page,
    count: count,
    results: [],
  };

  async function generateResponse(data) {
    const responseObj = await routes.getReviews(data)
    res.send(responseObj);
  }
  generateResponse(response);
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
  const newReview = req.query;
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
});





