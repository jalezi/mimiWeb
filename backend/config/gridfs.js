const mongoose = require('mongoose');
const multer = require('multer');
const Grid = require('gridfs-stream');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

const config = require('../config');

// Environment mode
const envNode = process.env.NODE_ENV;
const isDev = envNode !== 'production';

// Mongo URI
const mongoURI = isDev ? config.db_dev : config.db;

const gridFsSetUp = () => {
  const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
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
          const filename =
            buf.toString('hex') + path.extname(file.originalname);
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

  const gridFsObject = {
    conn,
    uploadMulterStorage,
  };
  return gridFsObject;
};

module.exports = gridFsSetUp();
