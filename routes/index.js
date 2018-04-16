var express = require('express');
var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");


var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();

global.primary_routes_title = {
    '/': 'Restaurant App',
    '/search': 'Search Restaurants',
    '/add_restaurant': 'Add Restaurant'
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {page: req.url})
});

/* GET search page. */
router.get('/search', function(req, res, next) {
    restaurant.prepare(req,res);
});

router.post('/search', restaurant.search);

/* GET Create Restaurant page. */
router.get('/add_restaurant', function(req, res, next) {
    res.render('add_restaurant', {
        page: req.url,
        API: process.env.GOOGLE_API});
});

module.exports = router;
