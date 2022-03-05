const mongoose = require('mongoose');

const postSchema= new mongoose.Schema({
  user_id: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
  },
  image: {
    type: String,
    default: 'default.png',
  },
  body: {
    type: String,
    required: true,
  },
  view_count: {
    type: Number,
    default: 0,
  },
  status: {
    type: Boolean,
    default: false,
  },
  is_approved: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

const Post= new mongoose.model('Post', postSchema);
module.exports=Post;
