const express = require('express');
const apparelSizeController = require('../../controllers/apparelSize.controller');

const router = express.Router();

router.route('/').post(apparelSizeController.createApparelSize).get(apparelSizeController.getApparelSizes);

router
  .route('/:apparelSizeId')
  .get(apparelSizeController.getApparelSize)
  .patch(apparelSizeController.updateApparelSize)
  .delete(apparelSizeController.deleteApparelSize);

module.exports = router;
