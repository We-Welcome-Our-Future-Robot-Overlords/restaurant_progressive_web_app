var Restaurant = require('../models/restaurants');

/* TODO try some query to see if database work as normal */
exports.retrieve = function (req, res) {
    console.log("foo bar");
    var rstrntData = req.body;
    if (rstrntData == null) {
        res.status(403).send('No data sent!')
    }
    try {
        Restaurant.find({name: rstrntData.req_name, cuisine: rstrntData.req_cuisine},
            function (err, restaurants) {
                if (err)
                    res.status(500).send('Invalid data!');
                var restaurant = null;
                if (restaurants.length > 0) {
                    var firstElem = restaurants[0];
                    restaurant = {
                        res_name: firstElem.name, res_cuisine: firstElem.cuisine
                    };
                }
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(restaurant));
            });
    } catch (e) {
        res.status(500).send('error ' + e);
    }
}
