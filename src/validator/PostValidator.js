const {body} = require('express-validator');

exports.postCreateValidator=[
  body('title').isString().withMessage('Post Title should be alphabetic')
      .notEmpty().withMessage('Post Title should not be empty').bail()
      .isLength({min: 2, max: 30})
      .withMessage('Post Title maximum 30 character').trim(),
  body('body')
      .notEmpty().withMessage('Post Body should not be empty')
      .bail().trim().isLength({min: 2})
      .withMessage('Post Title minimum 2 character'),
  body('tag').notEmpty().withMessage('Tag Should Not be Empty').bail(),
  body('category').notEmpty().withMessage('Category Should Not be Empty').bail(),
];
