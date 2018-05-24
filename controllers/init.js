var mongoose = require('mongoose');
var Restaurant = require('../models/restaurants');
var Cuisine = require('../models/cuisine');


exports.init = function () {
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
        title: 'Chicken',
    });

    c3.save(function (err, results) {
        console.log("c3_id: " + results._id);
    });

    var c4 = new Cuisine({
        title: 'Halal',
    });

    c4.save(function (err, results) {
        console.log("c4_id: " + results._id);
    });

    var c5 = new Cuisine({
        title: 'Malaysian',
    });

    c5.save(function (err, results) {
        console.log("c5_id: " + results._id);
    });


    var r1 = new Restaurant({
        name: 'Tasteez',
        cuisine: [c3._id, c4.id],
        description: 'Nope',
        address: "196 Brook Hill, Sheffield, United Kingdom",
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
        cuisine: [c1._id, c3.id],
        description: 'Kentucky Fried Chicken',
        address: "163 West Street, Sheffield, United Kingdom",
        location: {
            lat: 53.3800525,
            lng: -1.4792723000000478
        },
        official_photo: 'd790fc52239e1bcfc62d10d2c3888b621527140376919.jpg'
    });

    r2.save(function (err, results) {
        console.log("r2_id: " + results._id);
    });

    var r3 = new Restaurant({
        name: 'City Chicken Cafe',
        cuisine: [c3._id, c4._id],
        description: 'No coffee',
        address: "29 Mansfield Road, Nottingham, United Kingdom",
        location: {
            lat: 52.95837629999999,
            lng: -1.1493497
        }
    });

    r3.save(function (err, results) {
        console.log("r3_id: " + results._id);
    });

    var r4 = new Restaurant({
        name: 'KFC',
        cuisine: [c1._id, c3.id],
        description: 'Kentucky Fried Chicken',
        address: "23-25 Milton Street, Nottingham, United Kingdom",
        location: {
            lat: 52.9557397,
            lng: -1.1484259000000065
        },
        official_photo: 'fb5d9896f1aec89f7130c4b42dc0752b1527140159174.jpg'
    });

    r4.save(function (err, results) {
        console.log("r4_id: " + results._id);
    });

    var r5 = new Restaurant({
        name: "Mr Man's Restaurant",
        cuisine: [c2.id, c5.id],
        description: 'Wollaton',
        address: "Wollaton Park, Wollaton Road, Nottingham, United Kingdom",
        location: {
            lat: 52.9537045,
            lng: -1.213083
        }
    });

    r5.save(function (err, results) {
        console.log("r5_id: " + results._id);
    });

    var r6 = new Restaurant({
        name: 'Orient Express',
        cuisine: [c2.id, c4.id],
        description: 'Near Diamond',
        address: "290 Glossop Road, Sheffield, United Kingdom",
        location: {
            lat: 53.3802244,
            lng: -1.4823355999999421
        }
    });

    r6.save(function (err, results) {
        console.log("r6_id: " + results._id);
    });
}
