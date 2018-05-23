var express = require('express');
var router = express.Router();
var bodyParser= require("body-parser");
var multer = require('multer');
var crypto = require('crypto')


var restaurant = require('../controllers/restaurants');
var initDB= require('../controllers/init');
initDB.init();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../uploads/')
    },
    filename: function (req, file, cb) {
        crypto.pseudoRandomBytes(16, function (err, raw) {
            cb(null, raw.toString('hex') + Date.now() + '.jpg');
        });
    }
});
var upload = multer({ storage: storage });

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
    restaurant.prepare('add_restaurant', req, res, {
        page: req.url,
        API: process.env.GOOGLE_API});
});

/* Post Create Restaurant page. */
router.post('/add_restaurant', upload.single('photo'),  restaurant.add);

/* GET View Restaurant page. */
router.get('/restaurant/:id', function(req, res, next) {
    restaurant.show('restaurant', req, res);
});

module.exports = router;
