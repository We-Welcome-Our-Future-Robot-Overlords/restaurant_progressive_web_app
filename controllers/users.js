var bcrypt = require('bcryptjs');
var User = require('../models/user');

exports.checkAuth = function (req, res, next) {
  if (!req.session.user_id && req.path == '/add_restaurant') {
    res.send("Please login first");
    return;
  } else {
    next();
  }
}

exports.logout = function(req, res) {
  if (global.is_login = "Login"){
    res.send({success: false});
  } else {
    global.is_login = "Login";
    req.session.user_id = false;
    res.send({success: true});
  }
  
}

exports.register = function (req, res) {
  let email = req.body.email;
  let name = req.body.name;
  let pswd = req.body.pswd;
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(pswd, salt);

  User.find({email: email}, function(err, _res) {
    if(err){ throw err }
    if(_res.length > 0){
      res.send({success: false});
      return;
    }else{
      user = new User({
        'email': email,
        'name': name,
        'pswd': hash
      });

      user.save()
      req.session.user_id = new Date().getTime()
      res.status(200).send({success: true});  
    }
  })

}

exports.login = function (req, res) {
  var email = req.body.email;
  var pswd = req.body.pswd;
  User.find({email: email}, function(err, _res) {
    if(err){ res.send({msg: "This is Major Tom to Ground Control."})};
    if(_res.length > 0 && _res[0].pswd){
      let isCorrect = bcrypt.compareSync(pswd, _res[0].pswd);
      if(isCorrect){
        req.session.user_id = new Date().getTime();
        global.is_login = "Logout"
        
        res.status(200).send({succeed: true});          
      }else{
        res.status(200).send({failed: true});
      }
    } else {
      res.status(200).send({failed: true, msg: "This is Ground Control to Major Tom. "})
    } 
  })
}
