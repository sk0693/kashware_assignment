const mongoose = require('mongoose');
// const validator = require('validator');
// const bcrypt = require('bcryptjs');
// const { omit, pick } = require('lodash');

const fileSchema = mongoose.Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    description: {
      type: String,
      trim: true,
    },
    file: {
      type: Object,
    }
  },
  {
    timestamps: true,
    toObject: { getters: true },
    toJSON: { getters: true },
  }
);


const File = mongoose.model('File', fileSchema);

module.exports = File;
