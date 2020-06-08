const { Article, HttpError } = require('../models');

const getNewsCtrl = async (req, res, next) => {
  console.log('GET request in News');
  try {
    const articles = await Article.find()
      .populate(['attachments.images', 'attachments.files'])
      .sort({ date: -1, createdAt: -1 });
    return res.json(articles);
  } catch (error) {
    return res.json({ code: error.code, msg: error.message });
  }
};

const postNewsCtrl = async (req, res, next) => {
  console.log('POST request in News');
  const { date, title, body } = req.body;

  // if date or title not exist return error
  if (!date || !title) {
    const error = new HttpError(
      'Creating article failed, please try again',
      500
    );
    return next(error);
  }

  if (!body) {
    body = 'Content missing!';
  }

  const article = new Article({ date, title, body });
  try {
    await article.save();
    res.status(200).json({ article });
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Creating article failed, please try again',
      500
    );
    return next(error);
  }
};

const deleteNewsCtrl = async (req, res, next) => {
  console.log('DELETE request in News');
  const articleId = req.params.pid;
  console.log(articleId);
  let article;
  try {
    article = await Article.findById(articleId);
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete article.',
      500
    );
    return next(error);
  }

  try {
    await article.remove();
  } catch (err) {
    console.log(err);
    const error = new HttpError(
      'Something went wrong, could not delete article.',
      500
    );
    return next(error);
  }

  res.status(200).json({ message: 'Article deleted.' });
};

exports.getNewsCtrl = getNewsCtrl;
exports.postNewsCtrl = postNewsCtrl;
exports.deleteNewsCtrl = deleteNewsCtrl;

module.exports = {
  getNewsCtrl,
  postNewsCtrl,
  deleteNewsCtrl,
};
