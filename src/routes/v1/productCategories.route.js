const express = require('express');
const productCategoriesController = require('../../controllers/productCategories.controller');

const router = express.Router();

router.route('/').post(productCategoriesController.createProductCategories).get(productCategoriesController.getProductCategoriess);

router
  .route('/:productCategoriesId')
  .get(productCategoriesController.getProductCategories)
  .patch(productCategoriesController.updateProductCategories)
  .delete(productCategoriesController.deleteProductCategories);

module.exports = router;
