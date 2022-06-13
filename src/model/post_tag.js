const mongoose = require('mongoose');

const posttagSchema = new mongoose.Schema(
    {
      post_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post',
      },
      tag_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tag',
      },
    },
    {
      timestamps: true,
    },
);

// eslint-disable-next-line
const PostTag = new mongoose.model('PostTag', posttagSchema);
module.exports = PostTag;
