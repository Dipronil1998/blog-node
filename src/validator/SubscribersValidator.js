const {body} = require('express-validator');

exports.SubscribersValidator=[
  body('email')
      .notEmpty().withMessage('Email should not be empty!').bail()
      .isEmail().withMessage('Please Enter a valid Email')
      .normalizeEmail({gmail_remove_dots: false}),
];
