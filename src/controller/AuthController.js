const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const message = require('../../config/constant');
const {validationResult} = require('express-validator');
const sendMail=require('../middleware/mail');

exports.signUp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()
          .map((err) => `${err.msg}`)
          .join(', ')});
    }
    const {name, email, password, confirm_password} = req.body;
    if (password == confirm_password) {
      const user = new User({
        name: name,
        email: email,
        password: password,
        confirm_password: confirm_password,
      });
      await user.save();
      res.status(201).json({success: message.createSuccessfull});
    } else {
      res.status(400).json({error: message.passwordMismatched});
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.logIn = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()
          .map((err) => `${err.msg}`)
          .join(', ')});
    }
    const {email, password} = req.body;
    const emailuser = await User.findOne({email: email});
    if (emailuser) {
      const isValid = await bcrypt.compare(password, emailuser.password);
      const token = await emailuser.generateAuthToken();
      if (isValid) {
        res
            .status(200)
            .json({success: message.loginSuccessfully, token: token});
      } else {
        res.status(400).json({error: message.invalidCredientials});
      }
    } else {
      res.json({error: message.userNotExists});
    }
  } catch (error) {
    res.json({error: 'Invalid Email/Password'});
  }
};

exports.sendUserPasswordResetEmail=async (req, res) => {
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
        console.log(link);
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
      } else {
        res.send({message: 'Email doesn\'t exists'});
      }
    } else {
      res.send({message: 'Email Field is Required'});
    }
  } catch (error) {
    res.json({error: 'Something Wrong'});
  }
};

exports.userPasswordReset=async (req, res) => {
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
        const salt =Number(process.env.SALT);
        const newHashPassword = await bcrypt.hash(password, salt);
        await User.findByIdAndUpdate(user._id, {
          $set: {password: newHashPassword},
        });
        res.json({message: 'Password Reset Successfully'});
      }
    } else {
      res.json({message: 'All Fields are Required'});
    }
  } catch (error) {
    console.log(error);
    res.send({message: 'Invalid Token'});
  }
};
