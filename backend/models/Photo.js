const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema;

const Counter = require('./Counter');
const { counterInit } = require('../utils');
const { findCounterForModel } = counterInit;

const photoSchemaObject = {
  fileId: { type: ObjectId, ref: 'uploads', unique: true, required: true },
  name: {
    type: String,
    required: true,
    unique: false,
  },
  desc: {
    type: String,
    alias: 'description',
  },
  mt: {
    type: String,
    alias: 'mimetype',
    required: true,
  },
  tags: [String],
  default: { type: Boolean, default: false },
  originalSize: {
    width: Number,
    height: Number,
  },
  cnt: {
    type: Number,
    alias: 'counter',
  },
  bucketName: String,
  encoding: String,
  size: Number,
};

const photoSchema = new mongoose.Schema(photoSchemaObject, {
  timestamps: true,
});

// before saving photo doc, increment photo counter
photoSchema.pre('save', async function save(next) {
  console.log('Photo.save pre middleware');
  const doc = this;

  try {
    let counter = await findCounterForModel('photos');
    console.log('pre save photo', counter);
    if (counter.seq === 0) {
      doc.default = true;
    }
    doc.cnt = counter.seq + 1;
    counter = await Counter.updateOne({ _id: 'photos' }, { $inc: { seq: 1 } });
    next();
  } catch (error) {
    next(error);
  }
});

// after deleting photo doc, decrement photo counter
photoSchema.post(
  'findOneAndDelete',
  { document: true, query: false },
  async function deleteOne() {
    console.log('Photo.findOneAndDelete post middleware');
    try {
      let counter = await findCounterForModel('photos');
      counter = await Counter.updateOne(
        { _id: 'photos' },
        { $inc: { seq: -1 } }
      );
    } catch (error) {
      return error;
    }
  }
);

const Photo = mongoose.model('Photo', photoSchema);

module.exports = Photo;
