var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
  {
    user: {type: String, required: true},
    pswd: {type: String, required: true}
  }
);

User.set('toObject', {getters: true});

module.exports = mongoose.model('User', User);
