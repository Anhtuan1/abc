const express = require('express');
const app = express();

var bodyParser = require('body-parser');
var path = require('path');
// var ea = require('./server/ea');
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '4000mb' }));


app.get('/', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'index.html'));
})

var market = require('./server/router/market');

app.use('/market', market);

app.listen(3000, function () {
  console.log('listen to port 3000')
})
