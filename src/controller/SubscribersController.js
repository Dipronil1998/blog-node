const Subscribers = require('../model/subscribers');
const message = require('../../config/constant');

exports.create = async (req, res, next) => {
  try {
    const email = req.body.email;
    const getEmail = await Subscribers.findOne({email: email});
    if (!getEmail) {
      const subscriber = new Subscribers({
        email: email,
      });
      await subscriber.save();
      res.status(201).json({
        success: true,
        message: 'Email Subscription Added',
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Email Subscription Already Added',
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.find = async (req, res, next) => {
  try {
    const search = req.query.search;
    let subscribers;
    if (search) {
      subscribers = await Subscribers.find({email: search});
    } else {
      subscribers = await Subscribers.find();
    }
    if (subscribers.length === 0) {
      res.status(400).json({success: false, message: message.dataNotFound});
    } else {
      res.status(200).json(subscribers);
    }
  } catch (error) {
    next(error);
  }
};

exports.delete = async (req, res, next)=>{
  try {
    const _id = req.params.id;
    const getSubcribers = await Subscribers.findByIdAndDelete({_id: _id});
    if (!getSubcribers) {
      res.status(400)
          .json({
            success: false,
            message: 'Email Subscription Doesn\'t Exists',
          });
    } else {
      res.status(200)
          .json({
            success: true,
            message: 'Email Subscription Delete Successfully',
          });
    }
  } catch (error) {
    next(error);
  }
};
