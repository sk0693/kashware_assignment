const httpStatus = require('http-status');
const { userService, tokenService } = require('../services');
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

const login = async (req, res) => {
  const user = await userService.loginUser(req.body.email, req.body.password);
  const tokens = await authService.generateToken(user.id);
  const response = { user: user.transform(), tokens };
  res.send(response);
};

module.exports = {
  register,
  login
};
