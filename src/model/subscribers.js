const mongoose = require('mongoose');

const subscribersSchema= new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const Subscribers= new mongoose.model('Subscribers', subscribersSchema);
module.exports=Subscribers;
