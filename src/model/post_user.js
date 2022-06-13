const mongoose = require('mongoose');

const postuserSchema= new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line
const PostUser= new mongoose.model('PostUser', postuserSchema);
module.exports=PostUser;
