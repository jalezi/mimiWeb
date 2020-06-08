const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');
const cors = require('cors');
const methodOveride = require('method-override');

const config = require('./config');
const { newsRouter, galleryRouter } = require('./routes');
const { HttpError } = require('./models');

// running platform
const platform = process.platform;
// Environment mode
const envNode = process.env.NODE_ENV;

// Environment host
const envHost = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Environment port
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000;

const isDev = envNode !== 'production';

const app = express();

// not sure if this is necessary
app.set('host', envHost);
app.set('port', port);

// Middleware
app.use(bodyParser.json());
app.use(methodOveride('_method'));
app.use(cors());

// Mongo URI
const mongoURI = isDev ? config.db_dev : config.db;

// API Routes

// @desc /api/news ROUTES
app.use('/api/news', newsRouter);
app.use('/api/gallery', galleryRouter);

// TODO Error handling - check all next(err) or similar
app.use((req, res) => {
  console.log('Route not exists');
  const error = new HttpError('Could not find this route.', 404);
  return res.json(error);
});

app.use((error, req, res, next) => {
  if (req.file) {
    fs.unlink(req.file.path, err => {
      console.log(err);
    });
  }
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

app.use(express.static(path.join(__dirname, 'public')));

// TODO Investigate poolsize option for both mongo connections
// Set up Mongoose and App listen
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
    app.listen(port, err => {
      if (err) {
        process.exit(1);
      }
      console.log(
        isDev
          ? 'Server running in development mode!'
          : `Server running in ${envNode} mode!`
      );
      console.log(`Server running on port: ${port}`);
      console.log(`Server running on platform: ${platform}`);
    });
  })
  .catch(error => {
    console.log(error);
    process.exit(1);
  });
mongoose.Promise = global.Promise;
