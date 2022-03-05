const mongoose = require('mongoose');

const categorySchema= new mongoose.Schema({
  name: {
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
}, {
  timestamps: true,
});

categorySchema.methods.toJSON=function() {
  const category = this;
  const categoryObjects=category.toObject();

  delete categoryObjects._id;
  delete categoryObjects.__v;
  return categoryObjects;
};

const Category= new mongoose.model('Category', categorySchema);
module.exports=Category;
