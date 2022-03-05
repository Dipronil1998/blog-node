const express = require('express');
const router= new express.Router();
router.use(express.json({}));
const categoryController=require('../controller/CategoryController');
const {verifyToken} = require('../middleware/verifytoken');
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
router.post('', verifyToken, upload.single('image'),
    categoryValidator.createCategoryValidator,
    validateResult, imageValidate, categoryController.create);


// read all data
router.get('', verifyToken, categoryController.get);

// read particualr data
router.get('/:id', verifyToken, categoryController.getOne);


// update data by PATCH method by ID
router.patch('/category/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findByIdAndUpdate({'_id': _id}, req.body, {
      new: true,
    });
    res.send(category);
  } catch (error) {
    res.status(404).send(error);
  }
});

// DELETE data
router.delete('/category/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findByIdAndDelete({'_id': _id});
    if (!category) {
      res.status(404).send();
    } else {
      res.status(200).send(category);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports=router;
