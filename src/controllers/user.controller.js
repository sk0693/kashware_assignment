const httpStatus = require('http-status');
const { userService, tokenService } = require('../services');
const logger = require('../config/logger');


const register = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    const response = user;
    res.status(httpStatus.CREATED).send(response);
  } catch (error) {
    logger.error(error);
    res.status(httpStatus.BAD_REQUEST).send(error.message);
  }
};

const login = async (req, res) => {
  try {
    const user = await userService.loginUser(req.body.email, req.body.password);
    const token = await tokenService.generateToken(user._id);
    await userService.saveToken(token, user.id)
    const response = { user: user.transform(), token };
    res.send(response);
  } catch (error) {
    logger.error(error);
    res.status(error.status).json(error.message);
  }
};


module.exports = {
  register,
  login
};
