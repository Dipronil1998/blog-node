const mongoose = require('mongoose');

const subscribersSchema= new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line
const Subscribers= new mongoose.model('Subscribers', subscribersSchema);
module.exports=Subscribers;
