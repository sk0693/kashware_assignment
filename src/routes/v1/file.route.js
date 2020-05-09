const express = require('express');
const fileController = require('../../controllers/file.controller');

const router = express.Router();


router.post('/upload-single', fileController.uploadSingleFile);

module.exports = router;