let Restaurant = require('../models/restaurants');
let Cuisine = require('../models/cuisine');
let maths = require('../public/javascripts/maths');

//---GET---
exports.prepare = function(req, res) {
    let pttCursor = Cuisine.find({}).exec(function(err, cuisines) {
        res.render('restaurants', {
            page: req.url,
            cuisine_arr: cuisines,
            API: process.env.GOOGLE_API});
    });
}

//---POST---
//Remove empty attributes:
function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName];
        }
    }
}
exports.search = function (req, res) {
    const rstrntData = req.body;
    console.log("POST Data")
    console.log(rstrntData);
    clean(rstrntData);

    //Keyword Search
    if ('keywords' in rstrntData) {
        rstrntData.$text = {$search: rstrntData.keywords};
        delete rstrntData['keywords'];
    }

    //Cuisine Search
    if ('cuisine' in rstrntData) {
        let cuisine_arr = rstrntData.cuisine.split(",");
        if (rstrntData.all_any_cuisine == 'on') {
            rstrntData.cuisine = {$in: cuisine_arr};
        } else {
            rstrntData.cuisine = {$all: cuisine_arr};
        }
        delete rstrntData['all_any_cuisine'];
    }

    //Location Search
    const valid_coord = 'pac_input' in rstrntData;
    var lat1 = 0;
    var lng1 = 0;
    var radius = 0;
    if (valid_coord) {
        console.log("valid coordinates:", valid_coord);
        var lat1 = rstrntData.lat;
        var lng1 = rstrntData.lng;
        var radius = rstrntData.radius * 1000; //convert from km to m
    }
    delete rstrntData['lat'];
    delete rstrntData['lng'];
    delete rstrntData['radius'];
    delete rstrntData['pac_input'];
    const any_rstrnt = rstrntData == null || Object.keys(rstrntData).length == 0;
    console.log("any restaurant?", any_rstrnt);
    const invalid_data = !valid_coord && any_rstrnt;
    console.log("Query:")
    console.log(rstrntData);
    if (invalid_data) {
        console.log('no name, cuisine, or locus');
        res.status(403).send('No data sent!');
    } else {
        try {
            Restaurant.find(rstrntData,
                function (err, restaurants) {
                    if (err) {
                        res.status(500).send('Invalid data!');
                    } else {
                        if (valid_coord) {
                            console.log("Centre:", {lat1, lng1});
                            restaurants = restaurants.filter(function(rstrnt) {
                                var rstrnt_coord = rstrnt.location;
                                console.log(rstrnt_coord);
                                var distance =  maths.haversine(lat1,lng1,rstrnt_coord.lat,rstrnt_coord.lng);
                                console.log(distance);
                                var inrange = distance <= radius;
                                console.log(inrange);
                                return inrange;
                            });
                        }
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(restaurants));
                    }
                });
        } catch (e) {
            res.status(500).send('error ' + e);
        }
    }
}
