const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { User } = require('../models');

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    throw { status: httpStatus.BAD_REQUEST, message: 'Email already taken' };
  }
};

const checkPassword = async (password, correctPassword) => {
  const isPasswordMatch = await bcrypt.compare(password, correctPassword);
  if (!isPasswordMatch) {
    throw { status: httpStatus.UNAUTHORIZED, message: 'Password do not match' };
  }
};

/**
 * 
 * @param {Object} userBody 
 * @return {object } User doc type object
 * 
 * It will take body to create the new doc;
 */
const createUser = async userBody => {
  await checkDuplicateEmail(userBody.email);
  const user = await User.create(userBody);
  return user;
};

/**
 * 
 * @param {String} token 
 * @param {String} userId 
 * 
 * @return {null} null
 */
const saveToken = async (token, userId) => {
  await User.findByIdAndUpdate(userId, { token });
  return null;
};


/**
 * 
 * @param {string} email 
 * @param {string} password 
 * @return {object } User doc type object
 */
const loginUser = async (email, password) => {
  const user = await getUserByEmail(email);
  await checkPassword(password, user.password);
  return user;
};


/**
 * 
 * @param {String} email 
 * @return {object } User doc type object
 * 
 */
const getUserByEmail = async email => {
  const user = await User.findOne({ email });
  if (!user) {
    throw { status: httpStatus.NOT_FOUND, message: 'No user found with this email' };
  }
  return user;
};

module.exports = {
  createUser,
  loginUser,
  getUserByEmail,
  saveToken
};
