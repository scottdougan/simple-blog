const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport');

const app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Simple Blog listening on port 3000!');
});


