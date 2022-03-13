const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  user_id:
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  OTP: {
    type: String,
    required: true,
  },
  createdAt: {type: Date, default: Date.now},
  expairIn: {type: Date, expires: '10m', default: Date},
});

const Otp = new mongoose.model('Otp', otpSchema);
module.exports = Otp;
