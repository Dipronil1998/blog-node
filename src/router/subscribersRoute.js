const express = require('express');
const router = new express.Router();
const subscribersController = require('../controller/SubscribersController');
const { verifyTokenAndAdmin } = require('../middleware/verifytoken');
const subscribersValidator = require('../validator/SubscribersValidator');
const {validateResult} = require('../middleware/ValidateResult');

// create operation
router.post('', subscribersValidator.SubscribersValidator,
  validateResult, subscribersController.create);

// DELETE operation
router.get('', verifyTokenAndAdmin, subscribersController.find);

// DELETE operation
router.delete('/:id', verifyTokenAndAdmin, subscribersController.delete);

module.exports = router;
