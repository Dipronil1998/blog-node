const mongoose = require('mongoose');

const categorypostSchema= new mongoose.Schema({
  category_id: {
    type: String,
  },
  post_id: {
    type: String,
  },
}, {
  timestamps: true,
});

const CategoryPost= new mongoose.model('CategoryPost', categorypostSchema);
module.exports=CategoryPost;
