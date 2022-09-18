const cron = require('node-cron');
const moment = require('moment');
const Otp = require('../model/otp');

exports.otpCron = cron.schedule('20 * 19 18 Sep *', async () => {
  const previousTime = moment(new Date()).subtract(15, 'days').format('YYYY-MM-DD hh:mm:ss');
  console.log("previousTime: ", previousTime.split(' ')[0]);
  console.log((new Date(previousTime).toDateString()));
  const otp = await Otp.find({gte: {createdAt: new Date(previousTime)}});
  // console.log(otp)
});
