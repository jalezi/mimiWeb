const mongoose = require('mongoose');

var GridFsSchema = new mongoose.Schema(
  {
    filename: String,
  },
  { strict: false }
);

const GridFs = mongoose.model('GridFs', GridFsSchema, 'uploads.file');

module.exports = GridFs;
