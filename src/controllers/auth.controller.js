const httpStatus = require('http-status');
const { userService } = require('../services');
const logger = require('../config/logger');

const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const response = { user, token: '123' };
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.BAD_REQUEST).send(error);
  }
};

module.exports = {
  register,
};
