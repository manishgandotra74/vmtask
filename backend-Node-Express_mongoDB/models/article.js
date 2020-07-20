const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  title: { type: String, required: true },
  topic: { type: String, required: true },
  content: { type: String, required: true },
  isFeatured:{ type: Boolean, required: true },
  image: { type: String, required: true },
});

module.exports = mongoose.model('Article', postSchema);
