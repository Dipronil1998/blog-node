const Subscribers = require('../model/subscribers');
const message = require('../../config/constant');

exports.create = async (req, res) => {
  try {
    const email = req.body.email;
    const getEmail = await Subscribers.findOne({email: email});
    if (!getEmail) {
      const subscriber = new Subscribers({
        email:email
      });
      await subscriber.save();
      res.status(201).json({status:true,message: 'Email Subscription Added'});
    } else {
      res.status(400).json({status:false,message: 'Email Subscription Already Added'});
    }
  } catch (error) {
    res.status(400).send(error);
  }
};
