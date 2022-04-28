const mongoose = require('mongoose');

const postuserSchema= new mongoose.Schema({
  user_id: {
    type: String,
  },
  post_id: {
    type: String,
  },
}, {
  timestamps: true,
});

const PostUser= new mongoose.model('PostUser', postuserSchema);
module.exports=PostUser;
