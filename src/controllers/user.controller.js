const httpStatus = require('http-status');
const { fileService } = require('../services');
const logger = require('../config/logger');

const tinyController = require('./tinyUrl.controller');


const getUserDetails = async (req, res) => {
  try {
    let user = req.user;
    res.status(httpStatus.OK).send({ result: user });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};

const shareFile = async (req, res) => {
  try {
    const fileId = req.params.fileId;
    if (!fileId) {
      throw {
        status: httpStatus.BAD_REQUEST,
        message: "File id not found"
      }
    }

    let user = req.user;
    let url = await tinyController.checkAndGenerateTinyUrl(user.id, fileId);
    let tinyURL = req.headers.host + url['tinyUrl'];
    res.status(httpStatus.CREATED).send({ result: tinyURL });

  } catch (error) {
    console.log("error", error);
    res.status(error.status || httpStatus.BAD_REQUEST).send({ message: error.message });
  }
}


module.exports = {
  getUserDetails,
  shareFile
};
