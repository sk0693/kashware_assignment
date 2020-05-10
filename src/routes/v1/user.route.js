const express = require('express');
const userController = require('../../controllers/user.controller');


const router = express.Router();

router.get('/shareFile/:fileId', userController.shareFile);

router
    .route('/')
    .get(userController.getUserDetails);


module.exports = router;