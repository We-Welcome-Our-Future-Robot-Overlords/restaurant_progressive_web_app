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
    if (rstrntData == null || Object.keys(rstrntData).length == 0) {
        res.status(403).send('No data sent!');
    } else {
        try {
            Restaurant.find(rstrntData,
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
