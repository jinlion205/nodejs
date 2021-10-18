const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');


const thaiSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    age: {
      type: Number,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
thaiSchema.plugin(toJSON);
thaiSchema.plugin(paginate);

/**
 * @typedef Thai
 */
const Thai = mongoose.model('Thai', thaiSchema);

module.exports = Thai;
