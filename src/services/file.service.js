const { File } = require('../models');

const saveFile = async fileBody => {
  const user = await File.create(fileBody);
  return user;
};

const getFilesByUserId = async (userId, fileId) => {
  let query = {
    isDeleted: false,
    userId
  };
  if (fileId) {
    query['_id'] = fileId;
  }

  const files = await File.find(query);
  console.log("files", query)
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
  getFilesByUserId,
  deleteById
}