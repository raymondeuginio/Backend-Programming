const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  id: String,
  author: String,
  title: String,
  content: String,
  created_at: { type: Date, default: Date.now },
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
