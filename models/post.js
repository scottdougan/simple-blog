const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const postSchema = new Schema({
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