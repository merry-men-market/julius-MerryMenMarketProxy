const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const Pool = require('pg').Pool;

const pool = new Pool({
  user: '',
  host: 'localhost',
  database: 'stocks',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));





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

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
