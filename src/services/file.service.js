const { File } = require('../models');

/**
 * 
 * @param {Object} fileBody 
 * @return {object } file doc type object
 * 
 * It will take body to create the new doc;
 */
const saveFile = async fileBody => {
  const file = await File.create(fileBody);
  return file;
};

/**
 * 
 * @param {String} userId 
 * @param {String} fileId optional
 * 
 * @returns {fileSchema object} file(s) based on fileId
 */
const getFiles = async (userId, fileId) => {
  let query = {
    isDeleted: false,
    userId
  };
  if (fileId) {
    query['_id'] = fileId;
  }

  const files = await File.find(query);
  return files;
}


/**
 * 
 * @param {String} fileId 
 * @returns {fileSchema object} returns the file data
 */
const getFileForInternal = async (fileId) => {
  let query = {
    _id: fileId,
    isDeleted: false
  };
  const file = await File.findOne(query);
  return file;
}

/**
 * 
 * @param {String} userId 
 * @param {String} fileId 
 * 
 * @return {object}
 */
const deleteById = async (userId, fileId) => {
  const response = await File.updateOne({
    userId,
    _id: fileId
  }, { isDeleted: true });
  return response;
}

module.exports = {
  saveFile,
  getFiles,
  deleteById,
  getFileForInternal
}