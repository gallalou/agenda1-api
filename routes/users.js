var express = require('express');
var router = express.Router();
var User = require('../models/user.model');


/* GET users listing. */
router.get('/', function(req, res, next) {

  User.find({},function (err, users) {
    if(err) return next(err);
    return res.json(users);
  });

});



/* Get user id */

router.get('/:id', function(req, res, next){

  const id = req.params.id;

  User.findOne({_id: id}, function(err, user){
    if(err){
      console.log(err.message);
      res.json({
        "error": err.message
      });
    }

    res.json(user);

  });

});



module.exports = router;
