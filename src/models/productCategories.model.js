const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const productCategoriesSchema = mongoose.Schema(
  {
    productCategoriesName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
productCategoriesSchema.plugin(toJSON);
productCategoriesSchema.plugin(paginate);

/**
 * @typedef ProductCategories
 */
const ProductCategories = mongoose.model('ProductCategories', productCategoriesSchema);

module.exports = ProductCategories;
