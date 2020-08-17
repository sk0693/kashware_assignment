const httpStatus = require('http-status');
const jsonpatch = require('jsonpatch');
const logger = require('../config/logger');

const applyPatch = async (req, res) => {
    try {
        let { json_obj, patch_arr } = req.body;
        if (!json_obj || !patch_arr) {
            throw "json_obj or patch_arr is not found !!!"
        }
        
        let response = jsonpatch.apply_patch(json_obj, patch_arr);
        return res.status(httpStatus.OK).send({ result: response });
    } catch (error) {
        logger.error("applyPatch", error);
        return res.status(httpStatus.BAD_REQUEST).send({ message: error.message });
    }
};


module.exports = {
    applyPatch,
};
