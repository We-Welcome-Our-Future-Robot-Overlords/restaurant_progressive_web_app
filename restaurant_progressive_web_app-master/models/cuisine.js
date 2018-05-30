var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Cuisine = new Schema(
    {
        title: {type: String, required: true}
    }
);

Cuisine.set('toObject', {getters: true});

module.exports = mongoose.model('Cuisine', Cuisine);
