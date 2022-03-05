const User = require('../model/user');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const message = require('../../config/constant');
const {validationResult} = require('express-validator');

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
