const nodemailer = require('nodemailer');

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
	auth: {
		user: process.env.EMAIL,
		pass: process.env.PASSWORD
	}
});

let sendMail = (mailOptions)=>{
	mailTransporter.sendMail(mailOptions, function(err, data) {
		if(err) {
			console.log('Error Occurs');
			// console.log(err);
		} else {
			console.log('Email sent successfully');
		}
	});
}

module.exports = sendMail;