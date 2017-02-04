const mongoose = require('mongoose'),
  schema = mongoose.Schema;

const postSchema = new schema({
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  post: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Post', postSchema);