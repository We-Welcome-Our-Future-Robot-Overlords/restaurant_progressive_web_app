var express = require('express');
var router = express.Router();

// var initDB= require('../controllers/init');
var user = require('../controllers/user');
// initDB.init();

/* GET login page. */
router.get('/', function(req, res, next) {
  res.render('login', {
    page: req.url
  })
});

/* Post to Login. */
router.post('/login', user.login);

/* GET login page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    page: req.url
  })
});

/* Post to Register. */
router.post('/register', user.register);

module.exports = router;
