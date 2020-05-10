const httpStatus = require('http-status');
const { TinyUrl } = require('../models');

const CreateUrlDoc = async fileBody => {
  const user = await TinyUrl.create(fileBody);
  return user;
};

const getByTinyUrl = async tinyUrl => {
  const tinyUrlData = await TinyUrl.findOne({ tinyUrl: tinyUrl });
  return tinyUrlData;
}

module.exports = {
  CreateUrlDoc,
  getByTinyUrl
};
