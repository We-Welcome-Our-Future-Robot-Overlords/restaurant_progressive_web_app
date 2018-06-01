var express = require('express');
var router = express.Router();

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
    restaurant.prepare('search', req, res, {
        page: req.url});
});

router.post('/search', (req, res) => {
    restaurant.search(req, res, {
        page: req.url});
});

/* GET Create Restaurant page. */
router.get('/add_restaurant', function(req, res, next) {
    restaurant.prepare('add_restaurant', req, res, {
        page: req.url});
});

/* Post Create Restaurant page. */
router.post('/add_restaurant', restaurant.add);

/* GET View Restaurant page. */
router.get('/restaurant/:id', function(req, res, next) {
    restaurant.show('restaurant', req, res);
});

/* Post Review Restaurant page. */
router.post('/restaurant/:id', restaurant.review);

module.exports = router;
