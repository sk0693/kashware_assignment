const express = require('express');
const userRoute = require('./user.route');
const fileRoute = require('./file.route');
const tinyUrlRoute = require('./tinyUrl.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/file', fileRoute);
router.use('/tiny', tinyUrlRoute);
// router.use(`/${process.env.BASE_TINY_URL}`, tinyUrlRoute);

module.exports = router;
