const nodemailer = require('nodemailer');

const mailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const sendMail = (mailOptions)=>{
  mailTransporter.sendMail(mailOptions, function(err, data) {
    if (err) {
      console.log('Error Occurs');
      console.log(err);
    } else {
      console.log('Email sent successfully');
    }
  });
};

module.exports = sendMail;
