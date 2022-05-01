const User = require('../model/user');
const Otp = require('../model/otp');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const message = require('../../config/constant');
const sendMail = require('../middleware/mail');
const logger = require('../utils/logger');
const moment = require('moment');
const fs = require('fs');

exports.signUp = async (req, res) => {
  try {
    const {name, email, password, confirm_password} = req.body;
    const emailuser = await User.findOne({email: email});
    if (!emailuser) {
      if (password == confirm_password) {
        const user = new User({
          name: name,
          email: email,
          password: password,
          confirm_password: confirm_password,
        });
        const otp = await user.generateOTP();
        await user.save();
        await new Otp({
          user_id: user._id,
          OTP: otp,
        }).save();
        sendMail({
          from: process.env.EMAIL,
          to: user.email,
          subject: 'Verify OTP',
          html: `<h5>Hi ${user.name}</h5><p>Your OTP is: <b>${otp}</b>, 
          Valid for 10 minutes. Please do not share OTP with anyone.</p>`,
        });
        res.status(201).json({status: true, message: `OTP Sent To ${user.email}`});
        logger.info(`OTP Sent To ${user.email}`);
      } else {
        res.status(400).json({status: false, message: message.passwordMismatched});
        logger.error(message.passwordMismatched);
      }
    } else {
      res.status(404).json({status: false, message: 'User Already Exists'});
      logger.error('User Already Exists');
    }
  } catch (error) {
    res.status(400).json(error);
    logger.error(error);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const _id = req.params.id;
    const otp = req.body.otp;
    const otpInfo = await Otp.findOne({user_id: _id});
    if (otpInfo && otp === otpInfo.OTP && moment().format('hh:mm:ss')<=otpInfo.expairAt) {
      await User.findByIdAndUpdate({_id: _id}, {account_verified: true});
      res.status(200).json({status: true, message: message.createSuccessfull});
      logger.info(message.createSuccessfull);
    } else {
      res.status(404).json({status: false, message: 'Your OTP is Invalid'});
      logger.error('Your OTP is Invalid.');
    }
  } catch (error) {
    res.status(400).json(error);
    logger.error(error);
  }
};

exports.logIn = async (req, res) => {
  try {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({errors: errors.array()
    //       .map((err) => `${err.msg}`)
    //       .join(', ')});
    // }
    const {email, password} = req.body;
    const emailuser = await User.findOne({email: email});
    if (emailuser) {
      if (emailuser.account_verified) {
        const isValid = await bcrypt.compare(password, emailuser.password);
        const token = await emailuser.generateAuthToken();
        if (isValid) {
          res
              .status(200)
              .json({status: true, message: message.loginSuccessfully, token: token});
          logger.info(message.loginSuccessfully);
        } else {
          res.status(400).json({status: false, message: message.invalidCredientials});
          logger.error(message.invalidCredientials);
        }
      } else {
        res.status(400).json({error: 'Please Veriry Your Account'});
        logger.error('Please Veriry Your Account');
      }
    } else {
      res.json({status: false, error: message.userNotExists});
      logger.error(message.userNotExists);
    }
  } catch (error) {
    res.json({error: 'Invalid Email/Password'});
    logger.error('Invalid Email/Password');
  }
};

exports.sendUserPasswordResetEmail = async (req, res) => {
  try {
    const email = req.body.email;
    if (email) {
      const user = await User.findOne({email: email});
      if (user) {
        const secret = user._id + process.env.JWT_SECRET_KEY;
        const token = jwt.sign({userID: user._id}, secret, {
          expiresIn: '15m',
        });
        const link = `http://127.0.0.1:3000/api/user/reset/${user._id}/${token}`;
        // console.log(link);
        sendMail({
          from: process.env.EMAIL,
          to: user.email,
          subject: 'Password Reset Link',
          html: `<h5>Hi ${user.name}</h5><a href=${link}>Click Here</a> 
          to Reset Your Password`,
        });
        res.send({
          message: 'Password Reset Email Sent... Please Check Your Email',
        });
        logger.info('Password Reset Email Sent... Please Check Your Email');
      } else {
        res.send({message: 'Email doesn\'t exists'});
        logger.error('Email doesn\'t exists');
      }
    } else {
      res.send({message: 'Email Field is Required'});
    }
  } catch (error) {
    res.json({error: 'Something Wrong'});
    logger.error('Something Wrong');
  }
};

exports.userPasswordReset = async (req, res) => {
  const {password, confirm_password} = req.body;
  const {id, token} = req.params;
  const user = await User.findById(id);
  const new_secret = user._id + process.env.JWT_SECRET_KEY;
  try {
    jwt.verify(token, new_secret);
    if (password && confirm_password) {
      if (password !== confirm_password) {
        res.json({
          message: 'New Password and Confirm New Password doesn\'t match',
        });
      } else {
        const salt = Number(process.env.SALT);
        const newHashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, {
          $set: {password: newHashPassword},
        });
        res.json({message: 'Password Reset Successfully'});
        logger.info('Password Reset Successfully');
      }
    } else {
      res.json({message: 'All Fields are Required'});
    }
  } catch (error) {
    looger.error('Invalid Token');
    res.send({message: 'Invalid Token'});
  }
};

exports.changeUserPassword = async (req, res) => {
  try {
    // const oldPassword = req.body.old_password
    const password = req.body.password;
    const confirmPassword = req.body.confirm_password;
    if (password && confirmPassword) {
      if (password !== confirmPassword) {
        res.send({
          status: false,
          message: 'New Password and Confirm New Password doesn\'t match',
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(
            {_id: req.user._id},
            {
              $set: {password: newHashPassword},
            },
        );
        res.send({
          status: true,
          message: 'Password changed succesfully',
        });
      }
    } else {
      res.send({status: 'failed', message: 'All Fields are Required'});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.updateProfile = async (req, res)=>{
  try {
    const user = await User.findById(req.user._id);
    const oldProfilePic = user.image;
    const name = req.body.name || user.name;
    const about = req.body.about || user.about;
    if (req.file) {
      var newProfilePic = req.file.path;
    }
    const updateProfile = {
      name: name,
      image: newProfilePic || oldProfilePic,
      about: about,
    };
    await User.findByIdAndUpdate({_id: req.user._id}, updateProfile);
    if (newProfilePic) {
      fs.unlinkSync(oldProfilePic);
    }
    res.status(200).json({status: true, message: 'Profile Updated Successfully'});
  } catch (error) {
    console.log(error);
  }
};
