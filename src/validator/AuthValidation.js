const {body} = require('express-validator');

exports.signInValidator=[
  body('name').isString().withMessage('Name should be alphabetic')
      .notEmpty().withMessage('Name should not be empty!')
      .isLength({min: 2, max: 15})
      .withMessage('Name maximum 15 character'),
  body('email').isEmail().withMessage('Please Enter a valid Email')
      .normalizeEmail({gmail_remove_dots: false})
      .notEmpty().withMessage('Email should not be empty!'),
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
      .normalizeEmail({gmail_remove_dots: false})
      .notEmpty().withMessage('Email should not be empty!'),
  body('password').trim()
      .notEmpty().withMessage('Password should not be empty!'),
];

exports.forgotPasswordValidator=[
  body('email').isEmail().withMessage('Please Enter a valid Email')
      .normalizeEmail().notEmpty().withMessage('Email should not be empty!'),
];

exports.resetPasswordValidator=[
  body('password').trim()
      .notEmpty().withMessage('Password should not be empty!')
      .matches(/^(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      // eslint-disable-next-line
      .withMessage(`Password should be a alphanumeric, spcial character and minium 8 Bit long`),
  body('confirm_password').trim()
      .notEmpty().withMessage('Confirm Password should not be empty!'),
];


exports.changePasswordValidator=[
  body('password').trim()
      .notEmpty().withMessage('Password should not be empty!')
      .matches(/^(?=.{8,32})(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=]).*$/)
      // eslint-disable-next-line
      .withMessage(`Password should be a alphanumeric, spcial character and minium 8 Bit long`),
  body('confirm_password').trim()
      .notEmpty().withMessage('Confirm Password should not be empty!'),
];

exports.updateProfileValidator = [
  body('name').isAlpha('en-US', {ignore: ' '})
      .withMessage('Name should be alphabetic')
      .optional({nullable: true})
      .isLength({min: 2, max: 15})
      .withMessage('Name maximum 15 character'),
  body('about').isString()
      .optional({nullable: true})
      .isString()
      .withMessage('About should be alphabetic')
      .isLength({min: 2, max: 30})
      .withMessage('About be min 2 max 30 character'),
];
