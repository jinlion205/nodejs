const { ProductCategories } = require('../models');
const ApiError = require('../utils/ApiError');

/**
 * Create a productCategories
 * @param {Object} productCategoriesBody
 * @returns {Promise<ProductCategories>}
 */
const createProductCategories = async (productCategoriesBody) => {
  return ProductCategories.create(productCategoriesBody);
};

/**
 * Query for productCategoriess
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryProductCategoriess = async (filter, options) => {
  const productCategoriess = await ProductCategories.paginate(filter, options);
  return productCategoriess;
};

/**
 * Get productCategories by id
 * @param {ObjectId} id
 * @returns {Promise<ProductCategories>}
 */
 const getProductCategoriesById = async (id) => {
  return ProductCategories.findById(id);
};

/**
 * Get productCategories by email
 * @param {string} email
 * @returns {Promise<ProductCategories>}
 */
const getProductCategoriesByEmail = async (email) => {
  return ProductCategories.findOne({ email });
};

/**
 * Update productCategories by id
 * @param {ObjectId} productCategoriesId
 * @param {Object} updateBody
 * @returns {Promise<ProductCategories>}
 */
const updateProductCategoriesById = async (productCategoriesId, updateBody) => {
  const productCategories = await getProductCategoriesById(productCategoriesId);
  if (!productCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductCategories not found');
  }
  if (updateBody.email && (await ProductCategories.isEmailTaken(updateBody.email, productCategoriesId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(productCategories, updateBody);
  await productCategories.save();
  return productCategories;
};

/**
 * Delete productCategories by id
 * @param {ObjectId} productCategoriesId
 * @returns {Promise<ProductCategories>}
 */
const deleteProductCategoriesById = async (productCategoriesId) => {
  const productCategories = await getProductCategoriesById(productCategoriesId);
  if (!productCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductCategories not found');
  }
  await productCategories.remove();
  return productCategories;
};

module.exports = {
  createProductCategories,
  queryProductCategoriess,
  getProductCategoriesById,
  getProductCategoriesByEmail,
  updateProductCategoriesById,
  deleteProductCategoriesById,
};
