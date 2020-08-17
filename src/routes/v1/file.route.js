const express = require('express');
const fileController = require('../../controllers/file.controller');

const router = express.Router();


router.post('/createThumbnail', fileController.createThumbnail);
// router.get('/', fileController.getAll);

// router
//     .route('/:fileId')
//     .get(fileController.getById)
//     .delete(fileController.deleteById)


module.exports = router;