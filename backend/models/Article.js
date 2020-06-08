const mongoose = require('mongoose');
const Photo = require('./Photo');

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

articleSchema.pre('save', async function save(next) {
  console.log('Article.save pre middleware');
  const doc = this;
  try {
    const defaultPhoto = await Photo.find({ default: true });
    console.log(defaultPhoto);
    doc.attachments.images.push(defaultPhoto[0].id);
    next();
  } catch (error) {
    next(error);
  }
});

const Article = mongoose.model('Article', articleSchema);

module.exports = Article;
