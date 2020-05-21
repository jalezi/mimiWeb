const mongoose = require('mongoose');

const articleSchemaObject = {
  title: String,
  body: String,
};

const articleSchema = new mongoose.Schema(articleSchemaObject, {
  timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
