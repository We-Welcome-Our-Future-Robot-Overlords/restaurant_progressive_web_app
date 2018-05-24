var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true},
        cuisine:  [{type: Schema.Types.ObjectId, ref: 'Cuisine', required: true}],
        description: {type: String},
        address: {type: String},
        location: {
            lat: {type: Number},
            lng: {type: Number}
        },
        rating: {type: Number, default: 0},
        official_photo: {type: String},
        review_photos: [{type: String}]
    }
);

Restaurant.index({name: 'text', description: 'text', address: 'text'});
Restaurant.set('toObject', {getters: true});

module.exports = mongoose.model('Restaurant', Restaurant);
