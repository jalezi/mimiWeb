const mongoose = require('mongoose');
const util = require('util');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');

const config = require('../config');

// Environment mode
const envNode = process.env.NODE_ENV;
const isDev = envNode !== 'production';

// Mongo URI
const mongoURI = isDev ? config.db_dev : config.db;

const conn = mongoose.createConnection(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create storage engine
const storage = new GridFsStorage({
  url: mongoURI,
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const metadata = { ...file };
        const fileInfo = {
          filename,
          // bucketName should match the gfs collection
          bucketName: 'uploads',
          metadata,
        };

        resolve(fileInfo);
        return fileInfo;
      });
    });
  },
});

const uploadMulterStorage = multer({ storage });

const uploadFile = uploadMulterStorage.single('file');

const uploadFileMiddleware = util.promisify(uploadFile);

module.exports = uploadFileMiddleware;
