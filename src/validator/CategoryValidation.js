const {body, check} = require('express-validator');

exports.createCategoryValidator=[
  check('name').isString().withMessage('Category name should be alphabetic')
      .isLength({min: 2, max: 15})
      .withMessage('Category name maximum 15 character')
      .notEmpty().withMessage('Category name should not be empty!').trim(),

];


