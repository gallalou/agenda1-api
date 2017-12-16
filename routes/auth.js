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

  user.save(function(err, user){
    if(err) return next(err);
    return res.status(200).json({success : true, user : user});
  });
});



router.post('/login', function(req, res, next) {
  const {
    email,
    password
  } = req.body;
  User.findOne({email, password : md5(password)}, function(err, user){
    if(err || !user) return res.status(400).json({success : false, message: 'invalid credentials'});
    return res.status(200).json({success : true, message: 'Success Auth'}); 
  })
});


module.exports = router;
