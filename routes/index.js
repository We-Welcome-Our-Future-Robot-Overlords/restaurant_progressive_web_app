var express = require('express');
var router = express.Router();

var character = require('../controllers/restaurants');
var initDB = require('../controllers/init');
initDB.init();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Title' });
});

/* GET search page. */
router.get('/restaurants', function(req, res, next) {
    res.render('restaurants', { title: 'Restaurant Search' });
});

module.exports = router;
