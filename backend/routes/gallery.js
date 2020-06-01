const express = require('express');

const { galleryCtrl: ctrl } = require('../controllers');

const router = express.Router();

// @route POST /api/gallery/upload
// @desc Uploads file to DB
// 'file' is the name form input in frontend Gallery
router.post('/upload', ctrl.postUpload);

// @route GET /api/gallery/files
// @desc Display all files in JSON
router.get('/files', ctrl.getFiles);

// @route GET /api/gallery/files/:filename
// @desc Display single file in JSON
router.get('/files/:filename', ctrl.getFile);

// @route GET /api/gallery/image/:filename
// @desc Display single file in JSON
router.get('/image/:filename', ctrl.getImage);

// @route DELETE /api/admin/gallery/files/:id
// @desc Delete file
router.delete('/files/:id', ctrl.deleteFile);

module.exports = router;
