const {body} = require('express-validator');

exports.signInValidator=[
  body('name').isString().withMessage('Category name should be alphabetic')
      .isLength({min: 2, max: 15})
      .withMessage('Category name maximum 15 character')
      .notEmpty().withMessage('Category name should not be empty!'),
  body('email').isEmail().withMessage('Please Enter a valid Email')
      .normalizeEmail().notEmpty().withMessage('Email should not be empty!'),
  body('password').trim()
      .matches(/^(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .withMessage(`Password should be a alphanumeric,
      spcial character and mininum 8 Bit long`)
      .notEmpty().withMessage('Password should not be empty!'),
  body('confirm_password').trim()
      .notEmpty().withMessage('Confirm Password should not be empty!'),
];

exports.logInValidator=[
  body('email').isEmail().withMessage('Please Enter a valid Email')
      .normalizeEmail().notEmpty().withMessage('Email should not be empty!'),
  body('password').trim()
      .notEmpty().withMessage('Password should not be empty!'),
];

exports.forgotPasswordValidator=[
  body('email').isEmail().withMessage('Please Enter a valid Email')
      .normalizeEmail().notEmpty().withMessage('Email should not be empty!'),
];

exports.resetPasswordValidator=[
  body('password').trim()
      .matches(/^(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      .withMessage(`Password should be a alphanumeric,
      spcial character and minium 8 Bit long`)
      .notEmpty().withMessage('Password should not be empty!'),
  body('confirm_password').trim()
      .notEmpty().withMessage('Confirm Password should not be empty!'),
];

