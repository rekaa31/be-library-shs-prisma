var express = require('express');
const prisma = require('../config/prisma');
const { create, sendEmail, sendEmailWithTemplate } = require('../controllers/user.controller');
var router = express.Router();
var AUTH_MIDDLEWARE = require('../middlewares/auth.middleware');

/* GET users listing. */
router.get('/', AUTH_MIDDLEWARE, async function (req, res, next) {
  // Code untuk mengambil data dari database dalam konsep All Data
  const users = await prisma.user.findMany();
  res.json(users);
});

router.post('/create', create);

router.get('/send-email', (req, res) => {
  sendEmailWithTemplate({
    receiver: 'reka.alamsyah97@gmail.com',
    subject: 'Welcome to Reka Web',
    content: 'Hello, welcome to Reka Web'
  });
  res.json({ msg: 'Email sent' });
});

module.exports = router;
