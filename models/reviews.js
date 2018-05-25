var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Review = new Schema(
    {
        author: {type: String, required: true},
        restaurant:  {type: Schema.Types.ObjectId, ref: 'Restaurant', required: true},
        date:  { type: Date, default: Date.now,  required: true},
        star: {type: Number, default: 0, required: true},
        comment: {type: String}
    }
);

Review.set('toObject', {getters: true});

module.exports = mongoose.model('Review', Review);
