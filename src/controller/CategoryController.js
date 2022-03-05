const Category = require('../model/category');
const message = require('../../config/constant');

exports.create = async (req, res) => {
  try {
    const name = req.body.name;
    const image=req.file.path;
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
    if (category.length ===0) {
      res.status(400).json({'message': message.dataNotFound});
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
      res.status(400).json({'message': message.dataNotFound});
    } else {
      res.status(200).send(category);
    }
  } catch (error) {
    res.status(500).send(error);
  }
};


