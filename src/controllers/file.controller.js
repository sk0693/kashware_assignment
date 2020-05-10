const multer = require('multer');
const httpStatus = require('http-status');
const multerStorage = require('../config/multer-storage');
const path = require('path');
const fs = require('fs-extra')
const { fileService } = require('../services');
const logger = require('../config/logger');
const uploadPath = path.resolve(__dirname, '../../uploads/');

var storage = multerStorage({
  destination: async (req, file, cb) => {
    await fs.ensureDir(uploadPath);
    cb(null, uploadPath)
  },
  filename: (req, file, cb) => {
    cb(null, path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

const uploadSingle = upload.single('file');

const uploadSingleFile = async (req, res) => {

  uploadSingle(req, res, async function (err) {
    if (err) {
      return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err);
    }
    if (!req.file) {
      return res.status(httpStatus.BAD_REQUEST).json("Image not found");
    }
    const filename = req.filename;
    const filepath = '/uploads/';
    const fileData = {
      userId: req.user._id,
      title: req.body.title || filename,
      description: req.body.description,
      isCompressed: req.isCompressed,
      filUrl: filepath + filename,
      meta: {
        filepath: filepath,
        filename: filename,
        size: req.file.size,
        originalname: req.file.originalname
      }
    }
    await fileService.saveFile(fileData);
    return res.status(httpStatus.OK).send("File uploaded succesfully with name " + filename); // send("File Submitted successfully");
  })
};



// const uploadSingleFile = async (req, res) => {
//   var busboy = new Busboy({ headers: req.headers });
//   busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
//     var saveTo = path.join('./public', filename);
//     console.log('Uploading: ' + saveTo);
//     file.pipe(fs.createWriteStream(saveTo));
//   });
//   busboy.on('finish', function () {
//     console.log('Upload complete');
//     res.writeHead(200, { 'Connection': 'close' });
//     res.end("That's all folks!");
//   });
//   return req.pipe(busboy);

// }

const getAll = async (req, res) => {
  try {

    console.log("getAll")
    const user = req.user.transform()
    const result = await fileService.getFilesByUserId(user.id);

    res.status(httpStatus.OK).send({ result: result });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};


const getById = async (req, res) => {
  try {
    console.log("getById")
    const fileId = req.params.fileId;
    if (!fileId) {
      throw {
        status: httpStatus.BAD_REQUEST,
        message: "File id not found"
      }
    }
    const user = req.user.transform()
    const result = await fileService.getFilesByUserId(user.id, fileId)[0];
    res.status(httpStatus.OK).send({ "result": result });
  } catch (error) {
    res.status(error.status).send({ message: error.message });
  }
};

const deleteById = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!fileId) {
      throw {
        status: httpStatus.BAD_REQUEST,
        message: "File id not found"
      }
    }
    const user = req.user.transform()
    const result = await fileService.deleteById(user.id, fileId);
    res.status(httpStatus.NO_CONTENT).send({ result: result });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};


module.exports = {
  uploadSingleFile,
  getAll,
  getById,
  deleteById
};
