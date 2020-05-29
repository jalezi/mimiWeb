const express = require('express');

const { Article, HttpError } = require('../models');
const { newsCtrl: ctrl } = require('../controllers');

const router = express.Router();

// Returns all articles in by date & createdAt descending order
router.get('/', ctrl.getNewsCtrl);

// Saves new article to DB and returns saved article
router.post('/', ctrl.postNewsCtrl);

// Deletes article and returns message
router.delete('/:pid', ctrl.deleteNewsCtrl);

module.exports = router;
