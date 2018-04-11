var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true},
        cuisine: {type: [String], required: true},
        description: {type: String},
        address: {
            street: {type: String, required: true},
            city: {type: String, required: true},
            country: {type: String, required: true}
        },
        location: {
            lat: {type: Number},
            lng: {type: Number}
        }
        /* TODO add pic */
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

Restaurant.set('toObject', {getters: true, virtuals: true});

module.exports = mongoose.model('Restaurant', Restaurant);