var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
var User = require('../models/user.model');
const privateKey = require('../private.key');


/* GET users listing. */
router.get('/', function(req, res, next) {
  const token = req.headers['authorization'];
  console.log('token : ',token);
  if (token) {
    jwt.verify(token, privateKey, function(err, decode) {
      if(err){
        console.log(err);
        return res.json({
          success: false,
          message: 'error authorization'
        })
      }
      console.log('decodedToken : ',decode);
      User.find({}, function(err, users) {
        if (err) return next(err);
        return res.json(users);
      });
    })

  } else {
    return res.json({
      success: false,
      message: 'error authorization'
    })
  }


});



/* Get user id */

router.get('/:id', function(req, res, next) {

  const id = req.params.id;

  User.findOne({
    _id: id
  }, function(err, user) {
    if (err) {
      console.log(err.message);
      res.json({
        "error": err.message
      });
    }

    res.json(user);

  });

});



module.exports = router;
