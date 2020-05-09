const { File } = require('../models');

const saveFile = async fileBody => {
  const user = await File.create(fileBody);
  return user;
};

module.exports = {
    saveFile
}