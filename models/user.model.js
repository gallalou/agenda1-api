const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const md5 = require('md5');


const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'firstname is required']
  },
  surname: {
    type: String,
    required: [true, 'surname is required']
  },
  email: {
    type: String,
    required: [true, 'email is required'],
    unique: true
  },
  password: {
    type: String,
    required: [true, 'password is required']
  },
  gender: {
    type: String,
    enum: ["Male", "Female"],
    default: "Male"
  },
  age: {
    type: Number,
    min: 18,
    max: 100
  },
  registeredAt: {
    type: Date,
    required: [true],
    default: Date.now
  },
});

/*
userSchema.pre('save', function(next) {
  this.password = md5(this.password);
  next();
});
*/


module.exports = mongoose.model('User', userSchema);
