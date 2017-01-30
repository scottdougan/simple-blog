const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport');

const app = express();

const posts = [
  {id: 10, title: 'Black Ash'},
  {id: 11, title: 'Gray Birch'},
  {id: 12, title: 'Butternut'},
  {id: 13, title: 'Black Cherry'},
  {id: 14, title: 'Red Spruce'},
  {id: 15, title: 'Black Walnut'}
];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/posts', function (req, res) {
  res.send(JSON.stringify({posts: posts}));
});

app.listen(4000, function () {
  console.log('Simple Blog listening on port 4000!');
});


