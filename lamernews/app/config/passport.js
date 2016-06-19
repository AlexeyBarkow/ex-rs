const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.js');

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        console.log('f is called');
        User.findOne({
            username: username
         }).exec().then((user => {
             console.log('trying to log in:',user);
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

            // console.log('user is', user);
        })).catch(err => {
            console.log('error is', err);
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
