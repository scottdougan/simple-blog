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

function getRequestNumber(request, defaultNumber) {
  if (request) {
    const requestNumber = Number(request)

    if (_.isNumber(requestNumber) && !_.isNaN(requestNumber)) {
      return requestNumber;
    }
  }
  return defaultNumber // Return the default
}

// Endpoints
app.get('/posts', function(req, res) {
  let query = {};
  if (req.query.searchTitle) {
    query.title = { '$regex': req.query.searchTitle, '$options': 'i' }
  }
  if (req.query.author) {
    query.title = req.query.author;
  }

  let sort = {};
  if (req.query.sort && typeof(req.query.sort) === 'string') {
    sortList = req.query.sort.split(" ");
    for (let i = 0; i < sortList.length; i++) {
      const sortParameters = sortList[i].split(":");
      if (sortParameters.length == 2 && !(sortParameters[0] in sort)) {
        sort[sortParameters[0]] = sortParameters[1];
      }
      else {
        res.sendStatus(400) // Bad sort query
        return;
      }
    }
  }

  const skip = getRequestNumber(req.query.skip, 0);
  const limit = getRequestNumber(req.query.limit, 5);

  Post.find(query).skip(skip).limit(limit).sort(sort).exec(function(err, result) {
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
    
    Post.findByIdAndUpdate(query, {$inc: {viewCount: 1} }).exec(function(err, result) {
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
