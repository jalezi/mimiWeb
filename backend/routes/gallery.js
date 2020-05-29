const express = require('express');

const gridFsInit = require('../config/gridfs');
const { galleryCtrl: ctrl } = require('../controllers');

const router = express.Router();

const uploadMulterStorage = gridFsInit.uploadMulterStorage;

// @route POST /api/gallery/upload
// @desc Uploads file to DB
// 'file' is the name form input in frontend Gallery
router.post('/upload', uploadMulterStorage.single('file'), ctrl.postUpload);

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
