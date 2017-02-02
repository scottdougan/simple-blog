const express = require('express'),
	mongoose = require('mongoose'),
	passport = require('passport'),
  _ = require('underscore'),
  fuse = require('fuse.js');

const app = express();

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

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/posts', function (req, res) {
  if (req.query && req.query.postTitle) {
    const searchPostTitle = req.query.postTitle;
    console.log(`Searhing for ${searchPostTitle}`);

    const searchResults = fuseSearch.search(searchPostTitle);
    res.send(JSON.stringify({posts: searchResults}));
  }
  else {
    res.send(JSON.stringify({posts: posts}));
  }
});

app.get('/posts/:id', function(req, res) {
   console.log(req);
   res.send(JSON.stringify({posts: posts}));
});

app.listen(4000, function () {
  console.log('Simple Blog listening on port 4000!');
});
