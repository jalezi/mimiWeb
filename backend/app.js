const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config');
const newsRoutes = require('./routes/news');

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

app.use(bodyParser.json());

// not sure if this is necessary
app.set('host', envHost);
app.set('port', port);

// API Routes
app.use('/api/news', newsRoutes);
app.use((req, res) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
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

// Set up Mongoose and App listen
mongoose
  .connect(isDev ? config.db_dev : config.db, {
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
