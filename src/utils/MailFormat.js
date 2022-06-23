const sendMail = require('../middleware/mail');

const mailOtp = (name, email, otp) =>{
  sendMail({
    from: process.env.EMAIL,
    to: email,
    subject: 'Verify OTP',
    html: `<h5>Hi ${name}</h5><p>Your OTP is: <b>${otp}</b>, 
        Valid for 10 minutes. Please do not share OTP with anyone.</p>`,
  });
};

module.exports = {mailOtp};
