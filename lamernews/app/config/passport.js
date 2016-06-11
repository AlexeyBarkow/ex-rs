const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../controllers/users.js');

passport.use(new LocalStrategy(
    function (username, password, done) {
        User.findOne({
            username: username,
            password: password
         }).exec().then((user => {
            // if (!user) {
            //     return done(null, false, { message: 'incorrect username or password' });
            // }
            console.log(user);
            return done(null, user);
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
    })
})

module.exports = passport;
