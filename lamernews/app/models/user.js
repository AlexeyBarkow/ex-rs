'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var article = require('./article.js')
var userShema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    registrationDate: {
        type: Date
    },
    password: {
        type: String,
        required: true
    }
});
var User = mongoose.model('User', userShema);
module.exports = User;
