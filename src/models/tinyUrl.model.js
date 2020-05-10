const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const { omit, pick } = require('lodash');

const TinyUrlSchema = mongoose.Schema(
  {
    tinyUrl: {
      type: String,
      required: true,
      trim: true,
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
    },
    fileId: {
      type: String,
      required: true,
      trim: true,
    },
    userId: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
    // toObject: { getters: true },
    // toJSON: { getters: true },
  }
);

// userSchema.methods.toJSON = function () {
//   const user = this;
//   return omit(user.toObject(), ['password']);
// };

TinyUrlSchema.methods.transform = function () {
  const tinyUrl = this;
  return omit(tinyUrl.toObject(), ['_id']);
};

// userSchema.pre('save', async function (next) {
//   const user = this;
//   if (user.isModified('password')) {
//     user.password = await bcrypt.hash(user.password, 8);
//   }
//   next();
// });

const TinyUrl = mongoose.model('tinyurl', TinyUrlSchema);

module.exports = TinyUrl;
