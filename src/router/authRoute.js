const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const authController=require('../controller/AuthController');
const authValidator=require('../validator/AuthValidation');
const {validationResult} = require('express-validator');


const validateResult=(req, res, next)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({'error': errors.array()[0].msg});
  }
  next();
};

router.post(
    '/signup',
    authValidator.signInValidator,
    validateResult,
    authController.signUp,
);

router.post('/login', [authValidator.logInValidator], authController.logIn);

router.post('/forgotpassword', authValidator.forgotPasswordValidator,
    validateResult, authController.sendUserPasswordResetEmail);

router.post('/resetpassword/:id/:token', authValidator.resetPasswordValidator,
    validateResult, authController.userPasswordReset);


module.exports = router;
