var express = require('express');
var router = express.Router();



router.get('/login', function(req, res, next){
    res.render('login', {title: "login"});
})


router.get('/signup', function(req, res, next){
    res.render('signup', {title: "SignUp"});
})

module.exports = router;