var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var md5 = require('md5');
var isEmpty = require('lodash/isEmpty');
var Validator = require('validator');
var privateKey = require('../private.key');
var db = require('../db');


/** POST SIGNUP */

router.post('/signup', function (req, res, next) {
    const { firstname, surname, email, password, age, gender } = req.body;

    console.log(req.body);

    const { errors, isValid } = validateForm(req.body);


    if (isValid) {

        emailIsExist(email, function (err, exist) { 

            if (err || exist) {
                errors.email = 'Email is invalid';
                return res.status(400).json({ action: 'SIGNUP_ACTION', success: false, errors });
            }else{

                let collection = db.get().collection('users');
                collection.insert({
                    firstname,
                    surname,
                    email,
                    password: md5(password),
                    gender,
                    registeredAt: new Date(),
                }, function (err, result) {
                    //let {ops} = result;
                    if (err) {
                        return res.status(500).json({ action: 'SIGNUP_ACTION', success: false, errors: { err: err.message } });
                    }
                    //let user = ops[0];
                    return res.status(200).json({ action: 'SIGNUP_ACTION', success: true, errors: null });
                });
            }

        });



    } else {
        return res.status(400).json({ action: 'SIGNUP_ACTION', success: false, errors });
    }

});


function validateForm(f) {
    let errors = {};

    if (Validator.isEmpty(f.firstname))
        errors.firstname = 'This field is required';
    if (Validator.isEmpty(f.surname))
        errors.surname = 'This field is required';

    if (!Validator.isEmail(f.email)) {
        errors.email = 'Email is invalid';
    }

    if (Validator.isEmpty(f.password)) {
        errors.password = 'This field is required';
    } else
        if (!Validator.isLength(f.password, { min: 8, max: 20 }))
            errors.password = 'Password is invalid {min:8, max:20} charater';
    if (isEmpty(f.age)) {
        errors.age = 'This field is required';
    } else
        if (!Validator.isNumeric(f.age))
            errors.age = 'Age is invalid';


    return { errors, isValid: isEmpty(errors) };
}


function emailIsExist(email, callback) {
    let collection = db.get().collection('users');
    collection.find({ email }).toArray(function (err, users) {
        if (err)
            return callback(err, null);

        if (users.length > 0)
            return callback(null, true);

        return callback(null, false);
    });
}



/** POST LOGIN */

router.post('/login', function (req, res, next) {
    const { email, password } = req.body;

    emailIsExist(email, function (err, exist) {

        if (err || !exist) {

            // Email not exist 
            return res.status(401).json({ success: false, errors: { form: 'Invalid Credentials' } });


        } else {
            const crypted_password = md5(password);
            let collection = db.get().collection('users');
            collection.find({ email, password: crypted_password }).toArray(function (err, users) {

                if (err) return res.status(401).json({ success: false, errors: { form: 'Invalid Credentials' } });

                if (isEmpty(users)) {
                    return res.status(401).json({ success: false, errors: { form: 'Invalid Credentials' } });
                } else {

                    const user = users[0];
                    res.status(200).json({
                        success: true,
                        errors: {},
                        token: jwt.sign(
                            {
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
                }

            });

        }

    });

});


module.exports = router;