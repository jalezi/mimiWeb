const mongoose = require('mongoose');

const fileSchemaObject = {
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
};

const fileSchema = new mongoose.Schema(fileSchemaObject, {
  timestamps: true,
});

const File = mongoose.model('File', fileSchema);

module.exports = File;
