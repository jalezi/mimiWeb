const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const config = require('./config');

// running platform
const platform = process.platform;
// Environment mode
const envNode = process.env.NODE_ENV;

// Environment host
const envHost = process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0';

// Environment port
const port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 5000;

const isDev = envNode !== 'production';

// Set up Mongoose
mongoose
  .connect(isDev ? config.db_dev : config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connected');
  })
  .catch(error => {
    console.log(error);
  });
mongoose.Promise = global.Promise;

const newsRoutes = require('./routes/news');

const app = express();

// not sure if this is necessary
app.set('host', envHost);
app.set('port', port);

// API Routes
app.use('/api/news', newsRoutes);

app.listen(port, err => {
  if (err) {
    process.exit(1);
  }
  console.log(
    isDev
      ? 'Server running in development mode!'
      : `Server running in ${envNode} mode!`,
  );
  console.log(`Server running on port: ${port}`);
  console.log(`Server running on platform: ${platform}`);
});
