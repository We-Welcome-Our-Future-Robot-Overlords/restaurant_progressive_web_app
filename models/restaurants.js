var mongoose = require('mongoose');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true},
        cuisine:  [{ type: Schema.Types.ObjectId, ref: 'Cuisine', required: true}],
        description: {type: String},
        address: {type: String},
        location: {
            lat: {type: Number},
            lng: {type: Number}
        },
        star: {type: Number, default: 0},
        rating_count: {type: Number, default: 0},
        official_photo: {type: Schema.Types.ObjectId},
        review_photos: [{type: Schema.Types.ObjectId}]
    }
);

/* TODO auto lat lng input */
Restaurant.virtual('full_address')
    .get(function() {
        return this.name + " "
            +  this.address.street + " "
            +  this.address.city + " "
            +  this.address.country
    }
);

Restaurant.index({name: 'text', description: 'text', address: 'text'});

Restaurant.set('toObject', {getters: true, virtual: true});

module.exports = mongoose.model('Restaurant', Restaurant);
