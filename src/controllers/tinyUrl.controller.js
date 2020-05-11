const httpStatus = require('http-status');
const { tinyUrlService, fileService } = require('../services');
const fileController = require('./file.controller');
const logger = require('../config/logger');
const fs = require('fs-extra')
const path = require('path');

function getrandom() {
  let secret = ['F', 'O', 'X', 'Y'];
  let iden = secret[Math.floor(Math.random() * secret.length)];
  var random_string = Math.random().toString(32).substring(2, 5) + iden + Math.random().toString(32).substring(2, 5);
  return random_string;
}

const checkAndGenerateTinyUrl = async (userId, fileId) => {
  let file = (await fileService.getFiles(userId, fileId))[0];
  file = file.transform();
  // check file is available or not, if yes check it is deleted or not
  if (!file || file.isDeleted) {
    throw "File not found"
  }

  // check here the directory, is path fine
  let uploadPath = path.resolve(__dirname, `../../${file.fileUrl}`);
  if (!await fs.existsSync(uploadPath)) {
    throw new Error("File not found");
  }

  let newTinyUrl = process.env.BASE_TINY_URL;

  // if tinyUrl found then make it again till unique one
  while (true) {
    newTinyUrl += getrandom(); // get random key
    let tinyUrlData = await tinyUrlService.getByTinyUrl(newTinyUrl);
    if (!tinyUrlData) {
      break;
    }
  }

  const data = {
    originalUrl: file.fileUrl,
    tinyUrl: newTinyUrl,
    fileId,
    userId,
  }

  let urlDoc = await tinyUrlService.CreateUrlDoc(data);

  return urlDoc;
}

const serveFile = async (req, res) => {
  try {
    const url = req.params.url;
    let tinyUrlDoc = await tinyUrlService.getByTinyUrl(process.env.BASE_TINY_URL + url);
    if (!tinyUrlDoc) {
      throw 'Not Found';
    }
    let fileDoc = await fileService.getFileForInternal(tinyUrlDoc.fileId);
    if (!fileDoc) {
      throw 'Not Found';
    }
    
    res.setHeader('content-type', fileDoc['meta']['mimeType']);
    // res.setHeader('content-type', 'application/json');

    if (fileDoc['isCompressed']) {
      fileController.unCompressFile(fileDoc['fileUrl'], res);
    } else {
      let filepath = path.resolve(__dirname, `../../${tinyUrlDoc['originalUrl']}`);
      // res.setHeader('content-type', fileDoc['meta']['mimetype']);
      fs.createReadStream(filepath).pipe(res);
      // res.download(filepath);
    }
  } catch (error) {
    console.log(error);
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};



module.exports = {
  serveFile,
  checkAndGenerateTinyUrl
};
