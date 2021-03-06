const express = require('express');
const router= new express.Router();
router.use(express.json({}));
const postController=require('../controller/PostController');
const {verifyToken, verifyTokenAndAdmin} = require('../middleware/verifytoken');
const postValidator=require('../validator/PostValidator');
const {validateResult} = require('../middleware/ValidateResult');
const {imageValidate}= require('../middleware/ImageValidator');

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


// create operation
router.post('', verifyToken, upload.single('image'),
    postValidator.postCreateValidator, imageValidate,
    validateResult, postController.create);


// read all data
router.get('', verifyToken, postController.get);

// read particualr data
router.get('/:id', verifyToken, postController.getOne);

// Get Pending Post
router.get('/pending/post', verifyTokenAndAdmin, postController.pending);

// Approved Pending Post
router.put('/:id/approve', verifyTokenAndAdmin, postController.approved);


// // update data by PATCH method by ID
// router.put('/:id', verifyTokenAndAdmin, upload.single('image'),
//     categoryValidator.updateCategoryValidator, validateResult,
//     imageUpdateValidate,
//     categoryController.update);

// // DELETE data
// router.delete('/:id', verifyTokenAndAdmin, categoryController.delete);

module.exports=router;
