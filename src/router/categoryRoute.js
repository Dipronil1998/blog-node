const express = require('express');
const router= new express.Router();
router.use(express.json({}));
const categoryController=require('../controller/CategoryController');
const {verifyTokenAndAdmin} = require('../middleware/verifytoken');
const categoryValidator=require('../validator/CategoryValidation');
const {validationResult} = require('express-validator');
const {imageValidate}=require('../middleware/ImageValidator');


const multer = require('multer');
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './asset/image/category/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 2, // 2 mb file
  },
});

const validateResult=(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'error': errors.array()[0].msg});
  }
  next();
};

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
    imageValidate, categoryController.update);

// DELETE data
router.delete('/:id', verifyTokenAndAdmin, categoryController.delete);
module.exports=router;
