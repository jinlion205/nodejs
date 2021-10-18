const express = require('express');
const thaiController = require('../../controllers/thai.controller');

const router = express.Router();

router
  .route('/')
  .post(thaiController.createThai)
  .get(thaiController.getThais);

router
  .route('/:thaiId')
  .get(thaiController.getThai)
  .patch(thaiController.updateThai)
  .delete(thaiController.deleteThai);

module.exports = router;
