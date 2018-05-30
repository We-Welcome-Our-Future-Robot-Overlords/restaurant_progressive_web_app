var User = require('../models/user');

exports.register = function (req, res) {
  let user = req.body.user;
  let pswd = req.body.pswd;
  console.log(user);
  console.log(pswd);
  user = new User({
    'user': user,
    'pswd': pswd
  })
  user.save();
  res.status(200).send({success: true});
}

exports.login = function (req, res) {
  var user = req.body.user;
  var pswd = req.body.pswd;

  User.find({user: user}, function(err, _res) {
    if(err){ res.send({msg: "This is Major Tom to Ground Control."})};
    if(_res[0].pswd && _res[0].pswd === pswd){
      res.status(200).send({exist: true, msg: "I'm stepping through the door."})
    } else {
      res.status(200).send({exist: false, msg: "This is Ground Control to Major Tom. "})
    }else if(_res.length > 1){
      res.status(200).send({exist: false, msg: "This is Ground Control to Major Tom. "})
    }
  })
}
