var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const md5 = require('md5');
var privateKey = require('../private.key');
var User = require('../models/user.model');


/** POST SIGNUP */

router.post('/signup', function(req, res, next) {
  const {
    firstname,
    surname,
    email,
    password,
    age,
    gender
  } = req.body;

  console.log(req.body);

  const user = new User({
    firstname: firstname,
    surname: surname,
    email: email,
    password: md5(password),
    age: age,
    gender: gender
  });

  user.save(function(err, user) {
    if (err) return next(err);
    return res.status(200).json({
      success: true,
      user: user
    });
  });
});



router.post('/login', function(req, res, next) {
  const {
    email,
    password
  } = req.body;
  User.findOne({
    email,
    password: md5(password)
  }, function(err, user) {
    if (err || !user) return res.status(401).json({
      success: false,
      errors: {
        form: 'Invalid Credentials'
      }
    });
    console.log('privateKey: ',privateKey);
    return res.status(200).json({
      success: true,
      message: 'Success Auth',
      errors: {},
      token: jwt.sign({
          firstname: user.firstname,
          surname: user.surname,
          email: user.email,
          age: user.age,
          gender: user.gender,
          registeredAt: user.registeredAt,
        },
        privateKey
      ),
    });
  })
});


module.exports = router;
