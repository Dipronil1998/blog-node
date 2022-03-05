const {body} = require('express-validator');

exports.createTagValidator=[
  body('name').isString().withMessage('Tag name should be alphabetic')
      .isLength({min: 2, max: 15}).withMessage('Tag name maximum 15 character')
      .notEmpty().withMessage('Tag name should not be empty!'),
];


exports.updateTagValidator=[
  body('name').isString().withMessage('Tag name should be alphabetic')
      .isLength({min: 2, max: 15}).withMessage('Tag name maximum 15 character')
      .notEmpty().withMessage('Tag name should not be empty!')
      .optional({nullable: true}),
];

