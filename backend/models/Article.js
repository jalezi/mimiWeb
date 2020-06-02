const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const articleSchemaObject = {
  title: { type: String, required: true },
  body: String,
  date: Date,
  attachments: {
    images: [
      {
        type: ObjectId,
        ref: 'Photo',
      },
    ],
    files: [
      {
        type: ObjectId,
        ref: 'File',
      },
    ],
  },
};

const articleSchema = new mongoose.Schema(articleSchemaObject, {
  timestamps: true,
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
