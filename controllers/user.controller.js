const bycrypt = require('bcrypt');
const prisma = require('../config/prisma');
const transporter = require('../config/nodemailer');
const ejs = require('ejs');

async function create(req, res, next) {
	const { name, email, password } = req.body;

	const payload = {
		name: name,
		email: email,
		password: bycrypt.hashSync(password, 10)
	};

	const user = await prisma.user.create({
		data: payload,
	});
	res.json(user);
}

async function sendEmail(req, res, next) {
	

	const mailOptions = {
		from: 'noreply@reka.web.id',
		to: 'reka.alamsyah97@gmail.com',
		subject: 'Sending Email using Node.js',
		text: 'That was easy!'
	};

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error);
		} else {
			console.log('Email sent: ' + info.response);
		}
	});

	res.json({ msg: 'Email sent' });

}

async function sendEmailWithTemplate({ receiver, subject, content }) {
	ejs.renderFile(__dirname + '/templates/email/mailotp.ejs', { receiver, content }, (err, data) => {
		if (err) {
			console.log(err);
		} else {
			console.log(receiver)
			const mailOptions = {
				from: 'Reka Alamsyah <reka.alamsyah@gmail.com>',
				to: receiver,
				subject: subject,
				html: data,
				attachments: [
					{
						filename: 'license.txt',
						path: 'https://raw.github.com/nodemailer/nodemailer/master/LICENSE'
					}
				]

			};
		
			transporter.sendMail(mailOptions, function (error, info) {
				if (error) {
					console.log(error);
				} else {
					console.log('Email sent: ' + info.response);
				}
			});
		}
	});

	

}

module.exports = {
	create,
	sendEmail,
	sendEmailWithTemplate
};