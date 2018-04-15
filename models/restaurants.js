var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Restaurant = new Schema(
    {
        name: {type: String, required: true},
        cuisine:  [{ type: Schema.Types.ObjectId, ref: 'Cuisine', required: true}],
        description: {type: String},
        address: {
            street: {type: String, required: true},
            city: {type: String, required: true},
            country: {type: String, required: true}
        },
        location: {
            lat: {type: Number},
            lng: {type: Number}
        },
        star: {type: Number, default: 0},
        rating_count: {type: Number, default: 0}
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

Restaurant.index({name: 'text', description: 'text'});

Restaurant.set('toObject', {getters: true, virtual: true});

module.exports = mongoose.model('Restaurant', Restaurant);
