const bycrypt = require('bcrypt');
const prisma = require('../config/prisma');

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

module.exports = {
	create
};