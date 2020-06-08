const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const upload = require('../middleware/fileUpload');

const conn = mongoose.connection;

const { HttpError, Photo } = require('../models');

// Init gfs
let gfs;

conn.once('open', () => {
  // Init stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
  console.log('gridFS stream initialized');
});

// @route POST /api/gallery/upload
// @desc upload file/photo to db
// TODO if not image different parameters
const postUpload = async (req, res) => {
  console.log('POST /api/gallery/upload');
  try {
    // Upload file/photo
    await upload(req, res);
    const { width, height } = req.body;
    const { id, metadata, bucketName, size, filename } = req.file;
    const { encoding, originalname, mimetype } = metadata;

    // Create photo document
    const photoObject = {
      fileId: id,
      filename,
      originalSize: { height, width },
      mimetype: mimetype,
      encoding,
      name: originalname,
      size,
      bucketName,
    };
    const photo = new Photo(photoObject);
    await photo.save();
    return res.json({ file: req.file });
  } catch (error) {
    return res.json({ code: error.code, msg: error.message });
  }
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
    return res.json(files);
  });
};

const getFile = (req, res) => {
  console.log('GET /api/gallery/files/:filename');
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files
    if (!file || file.length === 0) {
      const error = new HttpError('No file exist', 404);
      console.log(error);
      return res.json({ code: error.code, msg: error.message });
    }
    // Files exists
    return res.json(file);
  });
};

const getImages = async (req, res) => {
  console.log('GET /api/gallery/images');
  let photoDocs;
  try {
    photoDocs = await Photo.find();
  } catch (error) {
    return res.json({ code: error.code, msg: error.message });
  }

  gfs.files.find().toArray((err, files) => {
    // Check if files
    if (!files || files.length === 0) {
      const error = new HttpError('No files exist', 404);
      return res.json({ code: error.code, msg: error.message });
    }
    // Files exists
    files.map(file => {
      const isImage =
        file.contentType === 'image/jpeg' || file.contentType === 'image/png';
      file.isImage = isImage;
      return isImage;
    });
    return res.json({ files, photoDocs });
  });
};

const getImage = (req, res) => {
  console.log('GET /api/gallery/images/:filename');
  gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
    // Check if files
    if (!file || file.length === 0) {
      const error = new HttpError('No file exist', 404);
      return res.json({ code: error.code, msg: error.message });
    }

    // Check if image
    if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
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
  console.log('DELETE /api/admin/gallery/files/:id');
  gfs.remove({ _id: req.params.id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      console.log(err);
      return res.json({ code: err.code, msg: err.message });
    }
    Photo.findOneAndDelete({ fileId: req.params.id }, err => {
      console.log('DELETE /api/admin/gallery/files/:filename Photo.deleteOne');
      if (err) {
        return res.json({ code: err.code, msg: err.message });
      }
    });
    return res.redirect('/admin/gallery');
  });
};

module.exports = {
  postUpload,
  getFiles,
  getFile,
  getImages,
  getImage,
  deleteFile,
};
