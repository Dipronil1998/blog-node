const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UserSchema = new mongoose.Schema({
  role_id: {
    type: Number,
    default: 2,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  account_verified: {
    type: Boolean,
    default: false,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: 'default.png',
  },
  about: {
    type: String,
  },
  current_sign_in_at: {
    type: Date,
  },
}, {
  timestamps: true,
});

UserSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  next();
});

UserSchema.methods.generateOTP = async function() {
  return Math.floor(
      Math.random() * (999999 - 110000 + 1) + 110000,
  );
};

// generate token
UserSchema.methods.generateAuthToken = async function() {
  try {
    const token = jwt.sign({
      _id: this._id,
      role_id: this.role_id,
    },
    process.env.SECRET_KEY,
    {expiresIn: '1h'});
    await this.save();
    return token;
  } catch (error) {
    throw error;
  }
};

// eslint-disable-next-line
const User = new mongoose.model('User', UserSchema);
module.exports = User;
