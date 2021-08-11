const db = require('./db');

const getReviewData = () => {
  db.query('SELECT * FROM reviews WHERE id = 1 OR id = 2;')
  .then((res) => console.log(res.rows));
}

getReviewData();

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