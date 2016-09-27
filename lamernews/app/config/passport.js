'use strict';
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user.js');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username
         }).exec().then((user => {
             if (user) {
                if (user.password === password) {
                    return done(null, user);
                } else {
                    done(null, false, {
                        message: 'Incorrect password'
                    })
                }
            } else {
                done(null, false, {
                    message: 'incorrect username'
                });
            }
        })).catch(err => {
            console.log('error', err);
        });
    }
));
passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(user => {
        done(null, user);
    }).catch(err => {
        console.log('error', err);
    });
})

module.exports = passport;
