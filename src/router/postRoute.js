const express = require('express');
const router= new express.Router();
router.use(express.json({}));
const postController=require('../controller/PostController');
const {verifyToken, verifyTokenAndAdmin} = require('../middleware/verifytoken');
const postValidator=require('../validator/PostValidator');
const {validationResult} = require('express-validator');
const {imageValidate, imageUpdateValidate}=
  require('../middleware/ImageValidator');

const multer = require('multer');
let upload = multer({dest: './asset/image/post/'});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './asset/image/post/');
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

const validateResult=(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'status': false, 'error': errors.array()[0].msg});
  }
  next();
};

// create operation
router.post('', verifyToken, upload.single('image'),
    postValidator.postCreateValidator, imageValidate,
    validateResult, postController.create);


// // read all data
// router.get('', verifyTokenAndAdmin, validateResult, categoryController.get);

// // read particualr data
// router.get('/:id', verifyTokenAndAdmin, validateResult,
//     categoryController.getOne);


// // update data by PATCH method by ID
// router.put('/:id', verifyTokenAndAdmin, upload.single('image'),
//     categoryValidator.updateCategoryValidator, validateResult,
//     imageUpdateValidate,
//     categoryController.update);

// // DELETE data
// router.delete('/:id', verifyTokenAndAdmin, categoryController.delete);

module.exports=router;
