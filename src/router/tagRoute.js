const express = require('express');
const router= new express.Router();
const tagController=require('../controller/TagController');
const {verifyTokenAndAdmin} = require('../middleware/verifytoken');
const tagValidator=require('../validator/TagValidation');
const {validateResult} = require('../middleware/ValidateResult');


// create operation
router.post('', verifyTokenAndAdmin, tagValidator.createTagValidator,
    validateResult, tagController.create);


// read all data
router.get('', verifyTokenAndAdmin, tagController.get);

// read particualr data
router.get('/:id', verifyTokenAndAdmin, tagController.getOne);


// update data by PATCH method by ID
router.put('/:id', verifyTokenAndAdmin, tagValidator.updateTagValidator,
    validateResult, tagController.update);

// // DELETE data
router.delete('/:id', verifyTokenAndAdmin, tagController.delete);

module.exports=router;
