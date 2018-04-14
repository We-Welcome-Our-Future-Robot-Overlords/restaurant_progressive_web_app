var Cuisine = require('../models/cuisine');

exports.retrieve = function() {
    console.log("foo bar");
    var foo = Cuisine.find({},
        function (err, cuisines) {
            if (err) {
                res.status(500).send('Invalid data!');
            } else {
                console.log("test2",JSON.stringify(cuisines));
            }
        });
    console.log("foo", foo);
}
