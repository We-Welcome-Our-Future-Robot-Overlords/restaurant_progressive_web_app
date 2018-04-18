var express = require('express');
var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");

let Restaurant = require('../models/restaurants');
var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();

global.primary_routes_title = {
    '/': 'Home',
    '/search': 'Search Restaurants',
    '/add_restaurant': 'Add Restaurant'
}

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        page: req.url
    });
});

/* GET search page. */
router.get('/search', function(req, res, next) {
    restaurant.prepare('search', req,res, {
        page: req.url,
        API: process.env.GOOGLE_API});
});

router.post('/search', (req, res) => {
    restaurant.search(req, res, {
        page: req.url,
        API: process.env.GOOGLE_API});
});

/* GET Create Restaurant page. */
router.get('/add_restaurant', function(req, res, next) {
    restaurant.prepare('add_restaurant', req,res, {
        page: req.url,
        API: process.env.GOOGLE_API});
});

/* GET View Restaurant page. */
router.get('/restaurant/:id', function(req, res, next) {
    Restaurant.findOne({_id: req.params.id}).exec(function(err, rstrnt) {
        restaurant.prepare('restaurant', req,res, {
                page: req.url,
                restaurant: rstrnt
            }
        )});
});

module.exports = router;
