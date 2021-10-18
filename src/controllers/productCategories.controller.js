const httpStatus = require('http-status');
const pick = require('../utils/pick');
const catchAsync = require('../utils/catchAsync');
const { productCategoriesService } = require('../services');

const createProductCategories = catchAsync(async (req, res) => {
  const productCategories = await productCategoriesService.createProductCategories(req.body);
  res.status(httpStatus.CREATED).send(productCategories);
});

const getProductCategoriess = catchAsync(async (req, res) => {
  const filter = pick(req.query, ['name', 'role']);
  const options = pick(req.query, ['sortBy', 'limit', 'page']);
  const result = await productCategoriesService.queryProductCategoriess(filter, options);
  res.send(result);
});

const getProductCategories = catchAsync(async (req, res) => {
  const productCategories = await productCategoriesService.getProductCategoriesById(req.params.productCategoriesId);
  if (!productCategories) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ProductCategories not found');
  }
  res.send(productCategories);
});

const updateProductCategories = catchAsync(async (req, res) => {
  const productCategories = await productCategoriesService.updateProductCategoriesById(req.params.productCategoriesId, req.body);
  res.send(productCategories);
});

const deleteProductCategories = catchAsync(async (req, res) => {
  await productCategoriesService.deleteProductCategoriesById(req.params.productCategoriesId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createProductCategories,
  getProductCategoriess,
  getProductCategories,
  updateProductCategories,
  deleteProductCategories,
};
