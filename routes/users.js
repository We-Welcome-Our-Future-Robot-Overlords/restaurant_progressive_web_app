var express = require('express');
var router = express.Router();
var users = require('../controllers/users');


/* GET login page. */
router.get('/login', function(req, res, next) {
  res.render('login', {
    page: req.url
  })
});

/* GET log out. */
router.get('/logout', users.logout);

/* Post to Login. */
router.post('/login', users.login);

/* GET login page. */
router.get('/register', function(req, res, next) {
  res.render('register', {
    page: req.url
  })
});

/* Post to Register. */
router.post('/register', users.register);

module.exports = router;
