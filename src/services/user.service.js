const httpStatus = require('http-status');
const { User } = require('../models');

const checkDuplicateEmail = async (email, excludeUserId) => {
  const user = await User.findOne({ email, _id: { $ne: excludeUserId } });
  if (user) {
    // throw new Error(httpStatus.BAD_REQUEST, 'Email already taken');
    throw 'Email already taken';
  }
};

const createUser = async userBody => {
  await checkDuplicateEmail(userBody.email);
  const user = await User.create(userBody);
  return user;
};

module.exports = {
  createUser
};
