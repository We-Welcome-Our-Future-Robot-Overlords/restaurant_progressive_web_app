var bcrypt = require('bcryptjs');
var User = require('../models/user');

exports.checkAuth = function (req, res, next) {
  if (!req.session.user_id && req.path == '/add_restaurant') {
    res.redirect('/users/login/');
    return;
  } else {
    next();
  }
}

exports.logout = function(req, res) {
  if (req.session.user_id !== undefined){
      req.session.destroy();
      res.send({success: true});
  } else {
      res.send({success: false});
  }
  
}

exports.register = function (req, res) {
  let email = req.body.email;
  let name = req.body.name;
  let pswd = req.body.pswd;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(pswd, salt);

  User.find({email: email}).exec(function(err, users) {
    if(err){ throw err }
    if(users.length >= 1){
      res.send({success: false});
      return;
    }else{
      user = new User({
        'email': email,
        'name': name,
        'pswd': hash
      });
      user.save().then(function (user_result){
        req.session.user_id = user_result._id;
        res.status(200).send({success: true});
      });
    }
  });
}

exports.login = function (req, res) {
  var email = req.body.email;
  var pswd = req.body.pswd;
  User.find({email: email}).exec(function(err, users) {
    if (err){
      res.send({msg: "Fail to Login"})
    }
    if(users.length == 1 && users[0].pswd){
      let isCorrect = bcrypt.compareSync(pswd, users[0].pswd);
      if (isCorrect){
        req.session.user_id = users[0]._id;
        res.status(200).send({succeed: true});          
      } else{
        res.status(200).send({failed: true});
      }
    } else {
      res.status(200).send({failed: true, msg: "Fail to Login"})
    } 
  });
}
