const Subscribers = require('../model/subscribers');
const message = require('../../config/constant');

exports.create = async (req, res) => {
  try {
    const email = req.body.email;
    const getEmail = await Subscribers.findOne({email: email});
    if (!getEmail) {
      const subscriber = new Subscribers({
        email: email,
      });
      await subscriber.save();
      res.status(201).json({status: true, message: 'Email Subscription Added'});
    } else {
      res.status(400).json({status: false, message: 'Email Subscription Already Added'});
    }
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.find = async (req, res) => {
  try {
    const search = req.query.search;
    if(search){
      var subscribers = await Subscribers.find({email:search});
    }else{
      var subscribers = await Subscribers.find();
    }
    if (subscribers.length === 0) {
      res.status(400).json({status: false,message: message.dataNotFound});
    } else {
      res.status(200).json(subscribers);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.delete = async (req, res)=>{
  try {
    const _id = req.params.id;
    const getSubcribers = await Subscribers.findByIdAndDelete({_id: _id});
    if (!getSubcribers) {
      res.status(400).json({status: false, message: 'Email Subscription Doesn\'t Exists'});
    } else {
      res.status(200).json({status: true, message: 'Email Subscription Delete Successfully'});
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
