const express = require('express');
const userRoute = require('./user.route');
const fileRoute = require('./file.route');
const patchRoute = require('./patch.route');

const router = express.Router();

router.use('/user', userRoute);
router.use('/file', fileRoute);
router.use('/patch', patchRoute);
// router.use(`/${process.env.BASE_TINY_URL}`, tinyUrlRoute);

module.exports = router;
