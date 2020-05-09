const multer = require('multer');
const httpStatus = require('http-status');
// const multerStorage = require('../config/multer-storage');
const path = require('path');
const { userService, fileService } = require('../services');
const logger = require('../config/logger');

const uploadPath = path.resolve(__dirname, '../../');
// const uploadTempPath = path.join(uploadPath, 'temp');
// const upload = multer({ dest: uploadTempPath });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(uploadPath)
    cb(null, uploadPath + '/public/my-uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})

const upload = multer({
  storage: storage
})

const uploadSingleFile = async (req, res) => {
  try {
    const uploadSingle = upload.single('file');

    uploadSingle(req, res, async function (err) {
      if (err) {
        return res.send(err);
      }
      const title = "my file";
      const fileData = {
        user_id: req.user._id,
        title: req.body.title || title,
        description : req.body.description || undefined
      }
      await fileService.saveFile(fileData);
      res.status(httpStatus.OK).send(req.file); // send("File Submitted successfully");
    })
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

module.exports = {
  uploadSingleFile,
};
