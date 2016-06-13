const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username
            // passwordField: password
         }).exec().then((user => {
             if (user) {
                if (user.password === password) {
                    done(null, user);
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

            console.log(user);
        })).catch(err => {
            console.log(err);
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
        console.log(err);
    });
})


// console.log(passport.authenticate);
module.exports = passport;
