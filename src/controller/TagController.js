const Tag = require('../model/tag');
const message = require('../../config/constant');

exports.create = async (req, res, next) => {
  try {
    const name = req.body.name;
    const slug = name.toLowerCase();
    const getTag = await Tag.findOne({slug: slug});
    if (!getTag) {
      const tag = new Tag({
        name: name,
        slug: slug,
      });
      await tag.save();
      res.status(201).json({message: 'Tag Created Successfully'});
    } else {
      res.status(400).json({message: 'Tag Already Exists'});
    }
  } catch (error) {
    next(error);
  }
};

exports.get = async (req, res, next) => {
  try {
    const tag = await Tag.aggregate([
      {
        $lookup: {
          from: 'posttags',
          localField: '_id',
          foreignField: 'tag_id',
          as: 'post_info',
        },
      },
      {
        $project: {
          name: 1,
          image: 1,
          count: {'$size': '$post_info'},
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);
    if (tag.length === 0) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).send(tag);
    }
  } catch (error) {
    next(error);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const tag = await Tag.findById({_id: _id});
    if (!tag) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).send(tag);
    }
  } catch (error) {
    next(error);
  }
};

exports.update = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const name=req.body.name;
    const updateData={
      name: name,
      slug: name.toLowerCase(),
    };
    const tag = await Tag.findByIdAndUpdate({_id: _id}, updateData);
    if (!tag) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).json({'message': 'Tag Update Successfully'});
    }
  } catch (error) {
    next(error);
  }
};

exports.delete=async (req, res, next) => {
  try {
    const _id = req.params.id;
    const tag = await Tag.findByIdAndDelete({'_id': _id});
    if (!tag) {
      res.status(400).json({message: message.dataNotFound});
    } else {
      res.status(200).json({'message': 'Tag Delete Successfully'});
    }
  } catch (error) {
    next(error);
  }
};
