const Tag = require("../model/tag");
const { validationResult } = require("express-validator");
const message = require("../../config/constant");

exports.create = async (req, res) => {
  try {
    const name = req.body.name;
    const slug = name.toLowerCase();
    const getTag = await Tag.findOne({ slug: slug });
    if (!getTag) {
      const tag = new Tag({
        name: name,
        slug: slug,
      });
      await tag.save();
      res.status(201).json({ message: "Tag Created Successfully" });
    } else {
      res.status(400).json({ message: "Tag Already Exists" });
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.get = async (req, res) => {
  try {
    const tag = await Tag.find();
    if (tag.length === 0) {
      res.status(400).json({ message: message.dataNotFound });
    } else {
      res.status(200).send(tag);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getOne = async (req, res) => {
  try {
    const _id = req.params.id;
    const tag = await Tag.findById({ _id: _id });
    if (!tag) {
      res.status(400).json({ message: message.dataNotFound });
    } else {
      res.status(200).send(tag);
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.update = async (req, res) => {
  try {
    const _id = req.params.id;
    const name=req.body.name;
    const updateData={
      name:name,
      slug:name.toLowerCase()
    }
    const tag = await Tag.findByIdAndUpdate({ _id: _id }, updateData, {
      new: true,
    });
    if(!tag){
      res.status(400).json({ message: message.dataNotFound });
    }else{
      res.status(200).json({"message":"Tag Update Successfully"});
    }
  } catch (error) {
    res.status(404).send(error);
  }
};
