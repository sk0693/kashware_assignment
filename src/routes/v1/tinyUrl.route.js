const express = require('express');
const router = express.Router();
const tinyController = require('../../controllers/tinyUrl.controller');


router
    .route('/:url')
    .get(tinyController.serveFile);

module.exports = router;
