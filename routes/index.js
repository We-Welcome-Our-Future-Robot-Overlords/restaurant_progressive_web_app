var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");


var restaurant = require('../controllers/restaurants');
var cuisine = require('../controllers/cuisine');
var initDB= require('../controllers/init');
initDB.init();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Restaurant App' });
});

/* GET search page. */
router.get('/restaurants', function(req, res, next) {
    res.render('restaurants', { title: 'Restaurant Search', cuisine_dict: cuisine.retrieve()});
});

router.post('/restaurants', restaurant.search);

/* GET Create Restaurant page. */
router.get('/create_restaurant', function(req, res, next) {
    res.render('create_restaurant', { title: 'Create Restaurant' });
});

module.exports = router;
