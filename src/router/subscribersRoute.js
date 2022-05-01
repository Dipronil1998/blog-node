const express = require('express');
const router= new express.Router();
const subscribersController=require('../controller/SubscribersController');
const {verifyTokenAndAdmin} = require('../middleware/verifytoken');
const subscribersValidator=require('../validator/SubscribersValidator');
const {validationResult} = require('express-validator');


const validateResult=(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({status:false,'error': errors.array()[0].msg});
  }
  next();
};

// create operation
router.post('', subscribersValidator.SubscribersValidator,
    validateResult, subscribersController.create);

// DELETE operation
router.delete('/:id', verifyTokenAndAdmin, subscribersController.delete);

module.exports = router;