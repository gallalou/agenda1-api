var db = require('./db');
var md5 = require('md5');
var url = 'mongodb://localhost:27017/calendly';
/*
db.connect(url, function(err, database){

    let collection = db.get().collection('users');
    collection.insertOne({
        firstname: 'fathi',
        surname: 'surname',
        email : 'fathi@mail.com',
        password : md5("1234"),
        gender: 'male'
    }, function(err, result){
        console.log(err);
        console.log(result);
    });
});


*/



function validateForm(f) {
    let errors = {};

    if (Validator.isEmpty(f.firstname))
        errors.firstname = 'This field is required';
    if (Validator.isEmpty(f.surname))
        errors.surname = 'This field is required';
    if (!Validator.isEmail(f.email)) {
        errors.email = 'Email is invalid';
    } else {
        if (emailIsExist(f.email)) {
            errors.email = 'Email is invalid';
        }
    }
    if (Validator.isEmpty(f.password)) {
        errors.password = 'This field is required';
    } else
        if (!Validator.isLength(f.password, { min: 8, max: 20 }))
            errors.password = 'Password is invalid {min:8, max:20} charater';
    if (isEmpty(f.age)) {
        errors.age = 'This field is required';
    } 
    /*else
        if (!Validator.isNumeric(f.age))
            errors.age = 'Age is invalid';
    */

    return { errors, isValid: isEmpty(errors) };
}


const {errors, isValid} = validateForm(
    {
        firstname: 'fathi',
        
    }
)
