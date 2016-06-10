const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var article = require('./article.js')
var userShema = Schema({
    username: {
        type: String,
        unique: true
    },
    email: {
        type: String
    },
    registrationDate: {
        type: Date
    },
    password: {
        type: String
    }
});
var User = mongoose.model('User', userShema);
module.exports = User;
