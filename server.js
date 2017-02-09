const express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  mongoQS = require('mongo-querystring'),
  passport = require('passport'),
  _ = require('underscore'),
  Post = require('./models/post');

// Setup
const app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "DELETE, GET, POST");
  next();
});

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost/simple_blog');
qs = new mongoQS({});


// Endpoints
app.get('/posts', function (req, res) {
  const query = qs.parse(req.query);

  Post.find(query).limit(20).exec(function(err, result) {
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
    
    Post.findOne(query).exec(function(err, result) {
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

app.post('/create', function(req, res) {
  const receivedPost = req.body.post;

  if (receivedPost) {
    const newPost = new Post({
      date: receivedPost.date,
      author: receivedPost.author,
      title: receivedPost.title,
      post: receivedPost.post
    });

    newPost.save(function (err) {
      if (err) {
        console.log(err);
        res.sendStatus(500)
      }
      else {
        res.send(JSON.stringify({post: newPost}));
      }
    });
  }
  else {
    res.sendStatus(400) // No post?
  }
});

app.delete('/posts/:id', function(req, res) {
  if (req.params.id && req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
    const query = { '_id': req.params.id }
    
    Post.remove(query).exec(function(err, removed) {
      if (err) {
        console.log(err);
        res.sendStatus(500)
      }
      else {
        if (removed.result.n) {
          res.sendStatus(200);
        }
        else {
          res.sendStatus(400);
        }
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
