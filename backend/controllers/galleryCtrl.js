const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const gridFsInit = require('../config/gridfs');

// Init gfs
let gfs;

gridFsInit.conn.once('open', () => {
  // Init stream
  gfs = Grid(gridFsInit.conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('gridFS stream initialized');
});

const postUpload = (req, res) => {
  console.log('POST /api/gallery/upload');
  res.redirect('/admin/gallery');
};

const getFiles = (req, res) => {
  console.log('GET /api/gallery/files');
  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      const error = new HttpError('No files exist', 404);
      return res.json({ code: error.code, msg: error.message });
    }
    // Files exists
    console.log(`[GET /api/gallery/files] files length: `, files.length);
    return res.json(files);
  });
};

const getFile = (req, res) => {
  console.log('GET /api/gallery/files/:filename');
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    console.log(file);
    // Check if files
    if (!file || file.length === 0) {
      const error = new HttpError('No file exist', 404);
      return res.json({ code: error.code, msg: error.message });
    }
    // Files exists
    console.log(
      `[GET /api/gallery/files/:${req.params.filename}] file: `,
      file
    );
    return res.json(file);
  });
};

const getImage = (req, res) => {
  console.log('GET /api/gallery/image/:filename');
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    console.log(file);
    // Check if files
    if (!file || file.length === 0) {
      const error = new HttpError('No file exist', 404);
      return res.json({ code: error.code, msg: error.message });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
      console.log(
        `[GET /api/gallery/files/:${req.params.filename}] file type: `,
        file.contentType
      );
      // Read output to browser
      const readstream = gfs.createReadStream(file.filename);
      return readstream.pipe(res);
    }
    // Not image
    const error = new HttpError('File is not an image', 404);
    return res.json({ code: error.code, msg: error.message });
  });
};

const deleteFile = (req, res) => {
  console.log('DELETE /api/admin/gallery/files/:filename');
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      console.log(err);
      const error = new HttpError('File was not deleted', 404);
      return res.json({ code: error.code, msg: error.message });
    }
    res.redirect('/admin/gallery');
  });
};

module.exports = {
  postUpload,
  getFiles,
  getFile,
  getImage,
  deleteFile,
};
