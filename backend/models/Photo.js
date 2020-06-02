const mongoose = require('mongoose');

const Counter = require('./Counter');

const photoSchemaObject = {
  name: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    alias: 'description',
  },
  fp: {
    type: String,
    alias: 'filepath',
    required: true,
  },
  ft: {
    type: String,
    alias: 'fileType',
    required: true,
  },
  tags: [String],
  default: Boolean,
  cnt: {
    type: Number,
    alias: 'counter',
  },
};

const photoSchema = new mongoose.Schema(photoSchemaObject, {
  timestamps: true,
});

photoSchema.pre('save', function save(next) {
  const doc = this;
  Counter.findById('photoId', { $inc: { seq: 1 } }, (err, counter) => {
    if (err) {
      return next(err);
    }
    doc.cnt = counter.seq;
    next();
  });
});

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
