const express = require('express');
const router= new express.Router();
router.use(express.json({}));
const categoryController=require('../controller/CategoryController');
const {verifyTokenAndAdmin} = require('../middleware/verifytoken');
const categoryValidator=require('../validator/CategoryValidation');
const {validateResult} = require('../middleware/ValidateResult');
const {imageValidate, imageUpdateValidate}=
  require('../middleware/ImageValidator');

const multer = require('multer');
let upload = multer({dest: './asset/image/category/'});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './asset/image/category/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  },
});

upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 mb file
  },
});

// create operation
router.post('', verifyTokenAndAdmin, upload.single('image'),
    categoryValidator.createCategoryValidator,
    validateResult, imageValidate, categoryController.create);


// read all data
router.get('', verifyTokenAndAdmin, validateResult, categoryController.get);

// read particualr data
router.get('/:id', verifyTokenAndAdmin, validateResult,
    categoryController.getOne);


// update data by PATCH method by ID
router.put('/:id', verifyTokenAndAdmin, upload.single('image'),
    categoryValidator.updateCategoryValidator, validateResult,
    imageUpdateValidate,
    categoryController.update);

// DELETE data
router.delete('/:id', verifyTokenAndAdmin, categoryController.delete);

module.exports=router;
