const Post = require('../model/post');
const Subscribers = require('../model/subscribers')
const PostUser = require('../model/post_user');
const message = require('../../config/constant');
const sendMail = require('../middleware/mail');
const fs = require('fs');

exports.create = async (req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;
    const image = req.file.path;
    const slug = title.toLowerCase();
    const getPost = await Post.findOne({slug: slug});
    if (!getPost) {
      if (req.user.role_id === 1) {
        is_approved = true;
      } else {
        is_approved = false;
      }
      const post = new Post({
        user_id: req.user._id,
        title: title,
        slug: slug,
        body: body,
        image: image,
        is_approved: is_approved,
      });
      await post.save();
      await new PostUser({
        user_id: req.user._id,
        post_id: post._id,
      }).save();
      res.status(201).json({status: true, message: 'Post Created Successfully'});
      const subscribers = await Subscribers.find();
      for(i=0; i<subscribers.length;i++){
        sendMail({
          from: process.env.EMAIL,
          to: subscribers[i].email,
          subject: 'New Blog Added',
          html: `<h5>Hi ${subscribers[i].email}</h5><p>New Blog Added.</p>`,
        });
      }
    } else {
      fs.unlinkSync(image);
      res.status(400).json({status: false, message: 'Post Already Exists'});
    }
  } catch (error) {
    console.log(error);
  }
};
