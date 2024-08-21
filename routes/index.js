var express = require('express');
const { auth } = require('../controllers/auth.controller');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Binar' });
});

router.post('/login', auth);

module.exports = router;
