const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const Pool = require('pg').Pool;
// require('newrelic');

// const Stock = require('../database/StockPricePaid/StockScheme.js');

const app = express();
const port = process.env.PORT || 8081;

// app.use(express.static(`${__dirname}/../public/`));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '../public')));

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'stocks',
  port: 5432,
});

let prices;
const nextId = 0; // for setting next id / = last id in db + 1;

app.get('/:id', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});


app.get('/api/:id', (req, res) => {
  const id = req.params.id;
  pool.query(`SELECT * FROM stocks where id=${id}`, (error, results) => {
    if (error) {
      throw error;
    }
    // get prices in floats
    // prices = results.rows[0].prices.split('|').map(ele => parseFloat(ele));
    // res.send(results.rows[0].prices.split('|').map(ele => parseFloat(ele)));

    res.status(200).json(results.rows[0]);
  });
});

// /************************************************************************/
// // SDC: POST endpoint 
// app.post('/api/price', (req, res) => {
//   var newStock = req.body;
//   Stock.create(newStock, (err, data) => {
//     if (err) {return err};
//     console.log("Post successful");
//   })
// })

// // SDC: DELETE endpoint 
// app.delete('/api/price/:id', (req, res) => {
//   // acquire id of thing you want to delete
//   var id = req.params.id;
//   Stock.deleteOne({id: id});
// });

// // SDC: UPDATE endpoint                                   Still need to appoint id with nextId var.
// app.patch('/api/price/:id', (req, res) => {
//   // set Default data equal to 001
//   Stock.updateOne({id: id});
// });
// /************************************************************************/

// // new get endpoint
// app.get('/api/price/:id', (req, res) => {
//   // set Default data equal to 001
//     db.getPaidPrice(req.params.id, (data) => {
//       res.status(200).json(data)
//     })
// });

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});

