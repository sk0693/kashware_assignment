const httpStatus = require('http-status');
const { TinyUrl } = require('../models');


/**
 * 
 * @param {Object} fileBody 
 * @return {object } tinyUrl doc type object
 * 
 * It will take body to create the new doc;
 */
const CreateUrlDoc = async fileBody => {
  const user = await TinyUrl.create(fileBody);
  return user;
};

/**
 * 
 * @param {String} tinyUrl 
 * @return {object } tinyUrl doc type object
 * 
 */
const getByTinyUrl = async tinyUrl => {
  const tinyUrlData = await TinyUrl.findOne({ tinyUrl: tinyUrl });
  return tinyUrlData;
}

module.exports = {
  CreateUrlDoc,
  getByTinyUrl
};
