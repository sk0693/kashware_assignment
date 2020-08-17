const httpStatus = require('http-status');
const { fileService } = require('../services');
const logger = require('../config/logger');



const getUserDetails = async (req, res) => {
  try {
    let user = req.user;
    res.status(httpStatus.OK).send({ result: user });
  } catch (error) {
    res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
  }
};


module.exports = {
  getUserDetails,
};
