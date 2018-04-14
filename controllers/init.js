var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var Cuisine = require('../models/cuisine');


exports.init= function() {
    // uncomment if you need to drop the database

    // Restaurant.remove({}, function(err) {
    //    console.log('collection removed')
    // });
    var c1 = new Cuisine({
        title: 'American',
    });

    c1.save(function (err, results) {
        console.log("c1_id: " + results._id);
    });

    var c2 = new Cuisine({
        title: 'Chinese',
    });

    c2.save(function (err, results) {
        console.log("c2_id: " + results._id);
    });

    var c3 = new Cuisine({
        title: 'Indian',
    });

    c3.save(function (err, results) {
        console.log("c3_id: " + results._id);
    });

    var c4 = new Cuisine({
        title: 'Japanese',
    });

    c4.save(function (err, results) {
        console.log("c4_id: " + results._id);
    });


    var r1 = new Restaurant({
        name: 'Tasteez',
        cuisine: [c3._id],
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
        console.log("r1_id: " + results._id);
    });

    var r2 = new Restaurant({
        name: 'KFC',
        cuisine: [c1._id],
        description: 'KFC',
        address: {
            street: '163 West Street',
            city: 'Sheffield',
            country: 'United Kingdom'
        },
        location: {
            lat: 53.3800525,
            lng:  -1.4792723000000478
        }
    });

    r2.save(function (err, results) {
        console.log("r2_id: " + results._id);
    });

    var r3 = new Restaurant({
        name: 'City Chicken Cafe',
        cuisine: [c3._id,c4._id],
        description: 'No coffee',
        address: {
            street: '29 Mansfield Road',
            city: 'Nottingham',
            country: 'United Kingdom'
        },
        location: {
            lat: 52.95837629999999,
            lng:  -1.4792723000000478
        }
    });

    r3.save(function (err, results) {
        console.log("r3_id: " + results._id);
    });
}

