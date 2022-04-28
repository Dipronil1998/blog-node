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
  body('tag_id').isMongoId().withMessage("Please Provide Tag Id")
      .notEmpty().withMessage('Tag Should Not be Empty').bail(),
  body('category_id').isMongoId().withMessage("Please Provide Category Id")
    .notEmpty().withMessage('Category Should Not be Empty').bail(),
];