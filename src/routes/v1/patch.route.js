const express = require('express');
const patchController = require('../../controllers/patch.controller');


const router = express.Router();

// router.get('/shareFile/:fileId', userController.shareFile);

router.post('/applyPatch', patchController.applyPatch);


module.exports = router;