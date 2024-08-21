const bycrypt = require('bcrypt');
const prisma = require("../config/prisma");
const jsonwebtoken = require('jsonwebtoken');

async function auth(req, res, next) {
	// Mengambil Email dan Password dari Request Body
	const { email, password } = req.body;

	// Mencari User berdasarkan email yang diinputkan
	const user = await prisma.user.findUnique({
		where: {
			email: email
		}
	});

	if (!user) {
		return res.status(401).json({ message: 'User tidak terdaftar' });
	}

	const isPasswordMatch = bycrypt.compareSync(password, user.password);

	if (!isPasswordMatch) {
		return res.status(401).json({ message: 'Email/Password Salah' });
	}

	const payload_token = {
		id: user.id,
		email: user.email
	};

	const token = jsonwebtoken.sign(
		payload_token,
		process.env.JWT_SECRET,
		{
			expiresIn: '1h'
		}
	);

	res.json({
		token: token
	});
}

module.exports = {
	auth
};