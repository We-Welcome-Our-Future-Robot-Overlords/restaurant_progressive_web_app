var Restaurant = require('../models/restaurants');

/* TODO try some query to see if database work as normal */

//Remove empty attributes:
function clean(obj) {
    for (var propName in obj) {
        if (obj[propName] === null || obj[propName] === undefined || obj[propName] === '') {
            delete obj[propName];
        }
    }
}

exports.retrieve = function (req, res) {
    var rstrntData = req.body;
    clean(rstrntData);
    var locus = {};
    console.log("lat 2 is", lat2);
    if ('lat' in rstrntData && 'lng' in rstrntData) {
        var lat2 = rstrntData.lat;
        var lng2 = rstrntData.lng;
        var radius = rstrntData.radius;
        locus = {$where: function() {
                var toreturn  = haversine(this.lat, lat2, this.lng, lng2) < radius;
                console.log(toreturn);
                return toreturn;
            }
        };
    }
    delete rstrntData['lat'];
    delete rstrntData['lng'];
    delete rstrntData['radius'];
    if (rstrntData == null || Object.keys(rstrntData).length == 0) {
        res.status(403).send('No data sent!');
    } else {
        try {
            console.log("locus is now:", locus);
            Restaurant.find({$and: [rstrntData, locus]},
                function (err, restaurants) {
                    if (err) {
                        res.status(500).send('Invalid data!');
                    } else {
                        res.setHeader('Content-Type', 'application/json');
                        res.send(JSON.stringify(restaurants));
                    }
                });
        } catch (e) {
            res.status(500).send('error ' + e);
        }
    }
}
