const { File } = require('../models');

const saveFile = async fileBody => {
  const user = await File.create(fileBody);
  return user;
};

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

const getFileForInternal = async (fileId) => {
  let query = {
    _id: fileId,
    isDeleted: false
  };
  const files = await File.findOne(query);
  return files;
}

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