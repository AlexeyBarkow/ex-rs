'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// var article = require('./article.js')
const userShema = Schema({
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
const User = mongoose.model('User', userShema);
module.exports = User;
