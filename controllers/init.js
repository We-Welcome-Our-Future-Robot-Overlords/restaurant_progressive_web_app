var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');


exports.init= function() {
    // uncomment if you need to drop the database

    // Restaurant.remove({}, function(err) {
    //    console.log('collection removed')
    // });

    var r1 = new Restaurant({
        name: 'Tasteez',
        cuisine: ['Junk','Chicken'],
        description: 'Nope',
        address: {
            street: '196 Brook Hill',
            city: 'Sheffield',
            country: 'United Kingdom'
        },
        location: {
            lat: 53.382081,
            lng: -1.482708
        }
    });

    r1.save(function (err, results) {
        console.log(results._id);
    });

    var r2 = new Restaurant({
        name: 'KFC',
        cuisine: ['Trash','Chicken'],
        description: 'KFC',
        address: {
            street: '163 West Street',
            city: 'Sheffield',
            country: 'United Kingdom'
        },
        location: {
            lat: 53.380106,
            lng: -1.479211
        }
    });

    r2.save(function (err, results) {
        console.log(results._id);
    });
}

