const express = require('express');
const fileController = require('../../controllers/file.controller');

const router = express.Router();


router.get('/', fileController.getAll);
router.post('/upload', fileController.uploadSingleFile);

router
    .route('/:fileId')
    .get(fileController.getById)
    .delete(fileController.deleteById)


module.exports = router;