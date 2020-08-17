const httpStatus = require('http-status');
const logger = require('../config/logger');
const Jimp = require('jimp');
const fs = require('fs-extra')
const path = require('path');

const filepath = "thumbnail/50x50.jpg";

/**
 *
 * @param image_url images url.
 */
const createThumbnail = async (req, res) => {
  try {
    let { image_url } = req.body;

    if (!image_url) {
      throw "image_url not found";
    }

    // Read the image.
    const image = await Jimp.read(image_url);
    // Resize the image to width 50 and heigth 50.
    await image.resize(50, 50);
    // Save or overwrite the image
    await image.writeAsync(filepath);

    res.setHeader('Content-Type', 'image/jpg');
    res.status(httpStatus.OK);
    // send file
    fs.createReadStream(filepath).pipe(res);
  } catch (error) {
    logger.error(error);
    return res.status(error.status || httpStatus.BAD_REQUEST).send(error);
  }
};

module.exports = {
  createThumbnail
};
