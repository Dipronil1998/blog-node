const express = require('express');
const router= new express.Router();
const Blog = require('../model/post');


// create operation
router.post('/blog', async (req, res) => {
  // console.log(req.body);
  try {
    const blog = new Blog(req.body);
    const createblog = await blog.save();
    res.status(201).send(createblog);
  } catch (error) {
    res.status(400).send(error);
  }
});


// read all data
router.get('/blog', async (req, res) => {
  // console.log(req.body);
  try {
    const blog = await Blog.find();
    res.status(201).send(blog);
  } catch (error) {
    res.status(400).send(error);
  }
});

// read particualr data
router.get('/blog/:id', async (req, res) => {
  // console.log(req.body);
  try {
    const _id = req.params.id;
    const blog = await Blog.findById({'_id': _id});
    if (!blog) {
      res.send();
    } else {
      res.status(200).send(blog);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});


// update data by PATCH method by ID
router.patch('/blog/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const blog = await Blog.findByIdAndUpdate({'_id': _id}, req.body, {
      new: true,
    });
    res.send(blog);
  } catch (error) {
    res.status(404).send(error);
  }
});

// DELETE data
router.delete('/blog/:id', async (req, res) => {
  try {
    const _id = req.params.id;
    const blog = await Blog.findByIdAndDelete({'_id': _id});
    if (!blog) {
      res.status(404).send();
    } else {
      res.status(200).send(blog);
    }
  } catch (error) {
    res.status(500).send(error);
  }
});
module.exports=router;
