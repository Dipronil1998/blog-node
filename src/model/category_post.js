const mongoose = require('mongoose');

const categorypostSchema= new mongoose.Schema({
  category_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
}, {
  timestamps: true,
});

// eslint-disable-next-line
const CategoryPost= new mongoose.model('CategoryPost', categorypostSchema);
module.exports=CategoryPost;
