const express = require('express'),
	mongoose = require('mongoose'),
  mongoQS = require('mongo-querystring'),
	passport = require('passport'),
  _ = require('underscore'),
  fuse = require('fuse.js'),
  post = require('./models/post');

// Setup
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const posts = [
  {id: 10, title: 'Black Ash'},
  {id: 11, title: 'Gray Birch'},
  {id: 12, title: 'Butternut'},
  {id: 13, title: 'Black Cherry'},
  {id: 14, title: 'Red Spruce'},
  {id: 15, title: 'Black Walnut'}
];

const fuseOptions = {
  shouldSort: true,
  tokenize: true,
  matchAllTokens: true,
  threshold: 0.2,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [
    "title",
  ]
};
const fuseSearch = new fuse(posts, fuseOptions);

mongoose.connect('mongodb://localhost/simple_blog');
qs = new mongoQS({});


// Endpoints
app.get('/posts', function (req, res) {
  const query = qs.parse(req.query);

  post.find(query).limit(20).exec(function(err, result) {
    if (err) {
      console.log(err);
      res.sendStatus(500)
    }
    else {
      res.send(JSON.stringify({posts: result}));
    }
  });
});

app.get('/posts/:id', function(req, res) {
  if (req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const query = { '_id': req.params.id }
    
    post.findOne(query).exec(function(err, result) {
      if (err) {
        console.log(err);
        res.sendStatus(500)
      }
      else {
        res.send(JSON.stringify({posts: result}));
      }
    });
  }
  else {
    res.sendStatus(400) // Invalid ID
  }
});

app.listen(4000, function () {
  console.log('Simple Blog listening on port 4000!');
});
