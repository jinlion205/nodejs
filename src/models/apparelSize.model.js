const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const apparelSizeSchema = mongoose.Schema(
  {
    sizeCode: {
      type: Number,
      required: true,
      trim: true,
    },
    sortOrder: {
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
apparelSizeSchema.plugin(toJSON);
apparelSizeSchema.plugin(paginate);

/**
 * @typedef ApparelSize
 */
const ApparelSize = mongoose.model('ApparelSize', apparelSizeSchema);

module.exports = ApparelSize;
