const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

const { HttpError, GridFs } = require('../models');
const config = require('../config');

const router = express.Router();

// Environment mode
const envNode = process.env.NODE_ENV;
const isDev = envNode !== 'production';

// Mongo URI
const mongoURI = isDev ? config.db_dev : config.db;

// Init gfs
let gfs;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('gridFS stream initialized');
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          // bucketName should match the gfs collection
          bucketName: 'uploads',
        };
        resolve(fileInfo);
      });
    });
  },
});
const uploadMulterStorage = multer({ storage });

// @route POST /api/gallery/upload
// @desc Uploads file to DB
// 'file' is the name form input in frontend Gallery
router.post('/upload', uploadMulterStorage.single('file'), (req, res) => {
  console.log('POST /api/gallery/upload');
  res.redirect('/admin/gallery');
});

// @route GET /api/gallery/files
// @desc Display all files in JSON
router.get('/files', (req, res) => {
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
});

// @route GET /api/gallery/files/:filename
// @desc Display single file in JSON
router.get('/files/:filename', (req, res) => {
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
});

// @route GET /api/gallery/image/:filename
// @desc Display single file in JSON
router.get('/image/:filename', (req, res) => {
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
});

// @route DELETE /api/admin/gallery/files/:id
// @desc Delete file
router.delete('/files/:id', (req, res) => {
  console.log('DELETE /api/admin/gallery/files/:filename');
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      console.log(err);
      const error = new HttpError('File was not deleted', 404);
      return res.json({ code: error.code, msg: error.message });
    }
    res.redirect('/admin/gallery');
  });
});

module.exports = router;
