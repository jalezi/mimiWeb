const express = require('express');

const { Article, HttpError } = require('../models');

const router = express.Router();

router.get('/', (req, res, next) => {
  console.log('GET request in News');
  Article.find()
    .then(docs => res.json(docs))
    .catch(err => next(err));
});

router.post('/', async (req, res, next) => {
  console.log('POST request in News');
  const { date, title, body } = req.body;
  console.log({ date, title, body });
  const article = new Article({ date, title, body });
  try {
    await article.save();
    res.status(200).json({ article });
  } catch (err) {
    const error = new HttpError(
      'Creating article failed, please try again',
      500
    );
    return next(error);
  }
});

module.exports = router;
