const Post = require('../model/post');
const Tag = require('../model/tag');
const Category = require('../model/category');
const Subscribers = require('../model/subscribers');
const PostUser = require('../model/post_user');
const CategoryPost = require('../model/category_post');
const PostTag = require('../model/post_tag');
const message = require('../../config/constant');
const sendMail = require('../middleware/mail');
const fs = require('fs');

exports.create = async (req, res) => {
  try {
    const title = req.body.title;
    const body = req.body.body;
    const image = req.file.path;
    const tag = req.body.tag;
    const category = req.body.category;
    const slug = title.toLowerCase();
    const status = req.body.status;
    const getTag = await Tag.find({slug: tag.toLowerCase()});
    if (getTag.length === 0) {
      fs.unlinkSync(image);
      return res.status(404).json({status: false, message: 'Tag Not Exists'});
    }
    const getCategory = await Category.find({slug: category.toLowerCase()});
    if (getCategory.length === 0) {
      fs.unlinkSync(image);
      return res.status(404).json({status: false, message: 'Category Not Exists'});
    }
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
        status: status,
        is_approved: is_approved,
      });
      await post.save();
      await new PostUser({
        user_id: req.user._id,
        post_id: post._id,
      }).save();
      await new CategoryPost({
        post_id: post._id,
        category_id: getCategory[0]._id,
      }).save();
      await new PostTag({
        post_id: post._id,
        tag_id: getTag[0]._id,
      }).save();
      res.status(201).json({status: true, message: 'Post Created Successfully'});
      const subscribers = await Subscribers.find();
      for (i = 0; i < subscribers.length; i++) {
        sendMail({
          from: process.env.EMAIL,
          to: subscribers[i].email,
          subject: 'New Blog Added',
          html: `<h5>Hi ${subscribers[i].email}</h5><p>New Blog Added. Please Check.</p>`,
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

exports.get = async (req, res, next) => {
  try {
    const post = await Post.find();
    if (post.length === 0) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).json(post);
    }
  } catch (error) {
    next();
    console.log(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const post = await Post.findById({_id: _id});
    const postCategory = await CategoryPost.find({post_id: _id}).populate('category_id');
    const postTag = await PostTag.find({post_id: _id}).populate('tag_id');
    if (!post) {
      res.status(400).json({success: false, message: message.dataNotFound});
    } else {
      res.status(200).json({success: true, post: post, category: postCategory[0].category_id.name, tag: postTag[0].tag_id.name});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.pending = async (req, res, next) => {
  try {
    const pendingPost = await Post.find({is_approved: false});
    if (pendingPost.length === 0) {
      res.status(400).json({success: false, message: message.dataNotFound});
    } else {
      res.status(200).json({success: true, message: pendingPost});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.approved = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const post = await Post.findById({_id: _id});
    if (!post) {
      res.status(400).json({success: false, message: message.dataNotFound});
    } else {
      if (post.is_approved == true) {
        res.status(200).json({success: false, message: 'Post Already Approved'});
      } else {
        await Post.findByIdAndUpdate({_id: _id}, {is_approved: true});
        res.status(200).json({success: true, message: 'Post Successfully Approved'});
      }
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

// exports.postByCategory = async(req,res,next)=>{
//   try {
//     const category = req.params.category;
//     const postByCategory = await Post.aggregate([
//       {
//         $lookup:{
//           from: 'categoryposts',
//           localField: '_id',
//           foreignField: 'category_id',
//           as: 'post_info'
//         }
//       }
//     ])
//   } catch (error) {
//     console.log(error)
//     next(error)
//   }
// }
