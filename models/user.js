var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
  {
    email: {type: String, required: true},
    name: {type: String, required: true},
    pswd: {type: String, required: true}
  }
);

User.path('email').index({ unique: true });
User.set('toObject', {getters: true});

module.exports = mongoose.model('User', User);
