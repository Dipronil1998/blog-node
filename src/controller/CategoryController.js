const Category = require('../model/category');
const message = require('../../config/constant');
const fs = require('fs');

exports.create = async (req, res) => {
  try {
    console.log(req.file);
    const name = req.body.name;
    const image = req.file.path;
    const slug = name.toLowerCase();
    const getCategory = await Category.findOne({slug: slug});
    if (!getCategory) {
      const category = new Category({
        name: name,
        slug: slug,
        image: image,
      });
      await category.save();
      res.status(201).json({message: 'Category Created Successfully'});
    } else {
      res.status(400).json({message: 'Category Already Exists'});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.get = async (req, res) => {
  try {
    const category = await Category.find();
    if (category.length === 0) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).send(category);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findById({_id: _id});
    if (!category) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).send(category);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const _id = req.params.id;
    const getCategory = await Category.findById({_id: _id});
    const oldImage = getCategory.image;
    console.log(oldImage);
    const name =  getCategory.name || req.body.name;
    const image =  getCategory.image || req.file.path;
    console.log(name);
    const updateData = {
      name: name,
      slug: name.toLowerCase(),
      image: image,
    };
    console.log(updateData);
    const category = await Category.findByIdAndUpdate({_id: _id}, updateData);
    if (!category) {
      res.status(400).json({status: false,message: message.dataNotFound});
    } else {
      res.setHeader('Content-Type', 'application/json');
      // if(req.file){

      // }
      res.status(200).json({status: true,message: 'Category Update Successfully'});
    }
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
};

exports.delete = async (req, res) => {
  try {
    const _id = req.params.id;
    const category = await Category.findByIdAndDelete({_id: _id});
    if (!category) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      const path = category.image;
      fs.unlinkSync(path);
      res.status(200).json({status:true,message: 'Category Delete Successfully'});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
