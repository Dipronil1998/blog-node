const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const authController=require('../controller/AuthController');
const authValidator=require('../validator/AuthValidation');


router.post(
    '/signup',
    [authValidator.signInValidator],
    authController.signUp,
);

router.post('/login', [authValidator.logInValidator], authController.logIn);


module.exports = router;
