const express = require('express');
const router = new express.Router();
router.use(express.json({}));
const authController=require('../controller/AuthController');
const authValidator=require('../validator/AuthValidation');
const {validationResult} = require('express-validator');
const {verifyToken} = require('../middleware/verifytoken')
const {imageValidate}=
  require('../middleware/ImageValidator');

const multer = require('multer');
let upload = multer({dest: './asset/image/profile/'});
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './asset/image/profile/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now()+'-'+file.originalname);
  },
});

upload = multer({
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

router.post(
    '/signup',
    authValidator.signInValidator,
    validateResult,
    authController.signUp,
);

router.put('/verifyotp/:id', authController.verifyOtp);

router.post('/login', [authValidator.logInValidator], authController.logIn);

router.post('/forgotpassword', authValidator.forgotPasswordValidator,
    validateResult, authController.sendUserPasswordResetEmail);

router.post('/resetpassword/:id/:token', authValidator.resetPasswordValidator,
    validateResult, authController.userPasswordReset);

router.put('/changepassword', verifyToken,authValidator.changePasswordValidator,
    validateResult, authController.changeUserPassword);

router.put('/updateprofile', verifyToken,upload.single('profile'),authValidator.updateProfileValidator,
    validateResult, authController.updateProfile);

module.exports = router;
