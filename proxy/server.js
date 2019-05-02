const newrelic = require('newrelic');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const morgan = require('morgan');
const path = require('path');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 7003;

app.locals.newrelic = newrelic;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`server running at: ec2-3-82-127-11.compute-1.amazonaws.com:${port}`);
});


app.get('/api/:stockId', (req, res) => {
  axios.get(`http://ec2-54-172-9-8.compute-1.amazonaws.com:8008//api/${req.params.stockId}`)
    .then((data) => {
      res.status(200).json(data.data);
    })
    .catch(() => {
      res.sendStatus(404);
    });
});
