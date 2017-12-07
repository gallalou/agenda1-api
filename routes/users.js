var express = require('express');
var router = express.Router();
var db = require('../db');
var ObjectId = require('mongodb').ObjectId;

/* GET users listing. */
router.get('/all', function(req, res, next) {
  var collection = db.get().collection('users');

  collection.find().toArray(function(err, users){
    if(err){
      console.log(err.message);
      res.json({
        "error": err.message
      });  
    }
    res.json(users);
  })
});



/* Get user id */

router.get('/:id', function(req, res, next){

  var id = req.params.id;
  var collection = db.get().collection('users');

  collection.find({_id: ObjectId(id)}).toArray(function(err, user){
    if(err){
      console.log(err.message);
      res.json({
        "error": err.message
      });  
    }
    
    res.json(user[0]);
    
  });

});



module.exports = router;
