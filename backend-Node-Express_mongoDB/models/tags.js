const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  tag_name: { type: String, required: true },
  article: { type: String, required: true },
});

module.exports = mongoose.model('Tags', postSchema);
