const express = require('express');

const { Article } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request in News');
  Article.find()
    .then(docs => res.json(docs))
    .catch(err => res.json(err));
});

module.exports = router;
