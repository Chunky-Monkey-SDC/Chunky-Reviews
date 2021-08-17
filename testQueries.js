const db = require('./db');
const axios = require('axios');

// const getReviewData = () => {
//   db.query('SELECT * FROM reviews WHERE id = 1 OR id = 2;')
//   .then((res) => console.log(res.rows));
// }

const postReview = () => {
  axios.post(`http://localhost:6969/reviews?product_id=1`, {
    product_id: 1000011,
    rating: 4,
    summary: 'the final test post test review',
    body: 'this is the body for my test review',
    recommend: true,
    name: 'cam',
    email: 'camboucher28@gmail.com',
    photos: [],
    date: Date.now().toString(),
    characteristics: {
      3347676: 3,
      3347677: 3,
      3347678: 3,
      3347679: 3
    }
  })
  .then((res) => console.log(res))
  .catch((err) => console.log(err))
};

// async function innerJoin(id) {
//   const photos = await db.query(`SELECT reviews.id, photos.photo_id, photos.url FROM reviews INNER JOIN photos ON review_id = reviews.id WHERE product = ${id};`)
//   const reviews = await db.query(`SELECT * FROM reviews WHERE product = ${id};`)
//   console.log(`Query for product_id = ${id}`, reviews.rows, photos.rows);
// }

postReview();
// innerJoin(2);
// innerJoin(1);

// const getMetadata = () => {
//   db.query('SELECT rating, COUNT(recommend) FROM reviews WHERE product = 1;')
//   .then((res) => console.log(res))
// }
// getReviewData();
// postReview();

// sample data returned
// rows: [
//   {
//     id: 1,
//     product: 1,
//     rating: 5,
//     date: '1596080481467',
//     summary: 'This product was great!',
//     body: 'I really did or did not like this product based on whether it was sustainably sourced.  Then I found out that its made from nothing at all.',
//     recommend: true,
//     reported: false,
//     name: 'funtime',
//     email: 'first.last@gmail.com',
//     response: 'null',
//     helpfulness: 8
//   }
// ]