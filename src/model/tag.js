const mongoose = require('mongoose');

const tagSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});


tagSchema.methods.toJSON=function() {
  const tag = this;
  const tagObjects=tag.toObject();

  delete tagObjects._id;
  delete tagObjects.__v;
  return tagObjects;
};

// eslint-disable-next-line
const Tag= new mongoose.model('Tag', tagSchema);
module.exports=Tag;
