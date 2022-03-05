const mongoose = require('mongoose');

const posttagSchema = new mongoose.Schema(
    {
      post_id: {
        type: String,
      },
      tag_id: {
        type: String,
      },
    },
    {
      timestamps: true,
    },
);

const PostTag = new mongoose.model('PostTag', posttagSchema);
module.exports = PostTag;
