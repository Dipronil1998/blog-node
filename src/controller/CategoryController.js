const Category = require('../model/category');
const message = require('../../config/constant');
const fs = require('fs');

exports.create = async (req, res) => {
  try {
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
      res.status(201).json({status: true,message: 'Category Created Successfully'});
    } else {
      fs.unlinkSync(image);
      res.status(400).json({status: false,message: 'Category Already Exists'});
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
    if (!getCategory) {
      return res.status(404).json({status: false, message: message.dataNotFound});
    } else {
      const oldImage = getCategory.image;
      const name = req.body.name || getCategory.name;
      if (req.file) {
        var newImage = req.file.path;
      }
      const updateData = {
        name: name,
        slug: name.toLowerCase(),
        image: newImage || oldImage,
      };
      await Category.findByIdAndUpdate({_id: _id}, updateData);
      if (newImage) {
        fs.unlinkSync(oldImage);
      }
      res.status(200).json({status: true, message: 'Category Update Successfully'});
    }
  } catch (error) {
    res.status(400).send(error);
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
      res.status(200).json({status: true, message: 'Category Delete Successfully'});
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
