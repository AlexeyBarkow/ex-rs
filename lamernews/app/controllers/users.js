'use strict';
const User = require('../models/user.js');
const passport = require('./../config/passport.js');
// console.log(passport);
// function addNewUser(username, password, email) {
    // var user = new User({
    //     username: username,
    //     password: password,
    //     email: email,
    //     registrationDate: new Date()
    // });
    // return user.save();
    // console.log(user.id);
// }
//
// function updateUser(username, newUsername, newPassword, newEmail) {
//     var newData = {};
//     if (newUsername) {
//         newData['username'] = newUsername;
//     }
//     if (newPassword) {
//         newData['password'] = newPassword;
//     }
//     if (newEmail) {
//         newData['email'] = newEmail;
//     }
//     return User.update({ username }, {$set : newData});
// }

// function getUserByUsername(username) {
//     return userPromise = User.findOne({
//         username: username.toLowerCase()
//     }, 'username email registrationDate');
// }

// function deleteUser(username) {
//     return User.findOne({ username }).remove().exec();
// }
// function isValidPassword()

function getPublicUserInfo (req, res, next) {
// console.log(req, req.isAuthenticated)
    //should return public user info
    // console.log(req.query, req.body, req.params);
    // var username = req.params.username;
    // users.getUserByUsername(req.params.username)
    var username = req.params.username;
    // if (req.body.type === 'json')
    // console.log(req.header
    //duct tape

    console.log('logged user', req.user)
    if (req.get('Content-Type')) {

        User.findOne({
            username: username.toLowerCase()
        }, 'username email registrationDate')
        .then((user) => {
            console.log('user',user);
            if (user) {
                res.setHeader('Content-Type', 'application/json');
                res.json(user);
            } else {
                res.status(404).json({
                    message: 'user not found'
                });
            }
        });
    } else {
        next();
    }
    // console.log('user',user);
    // res.sendStatus(404);
}
function createNewUser (req, res) {
    'use strict';
    // router.use(bodyParser());
    // console.log(req.body);
    //should create new user if username isn't taken already
    let username = req.body.username.toLowerCase();
    let password = req.body.password;
    let email = req.body.email.toLowerCase();
    let user = new User({
        username,
        password,
        email,
        registrationDate: new Date()
    });
    user.save()
    // users.addNewUser(req.params.username.toLowerCase(), req.body.password, req.body.email.toLowerCase())
    .then((user) => {
        console.log(user);
        // res.setHeader('Content-Type', 'application/json');
        res.json({ 'message' : 'success' });
    }).catch((error) => {
        console.log('error', error);
        // res.setHeader('Content-Type', 'application/json');
        res.json({
            'message' : error.errmsg
            // 'error' : error.errmsg
        });
    });
    // res.sendStatus(404);
};


function updateUser (req, res) {

    if (req.isAuthenticated()) {
        var newData = {};
        var username = req.user.username;
        if (username !== req.params.username) {
            res.sendStatus(403);
        } else {
            var newUsername = req.body.username;
            var newPassword = req.body.password;
            var newEmail = req.body.email;
            if (newUsername) {
                newData['username'] = newUsername;
            }
            if (newPassword) {
                newData['password'] = newPassword;
            }
            if (newEmail) {
                newData['email'] = newEmail;
            }
            User.update({ username }, {$set : newData})
            // users.updateUser(req.params.username, req.body.username, req.body.password, req.body.email)
            .then((success) => {
                console.log(success);
                // res.setHeader('Content-Type', 'application/json');
                res.json(success);
            }).catch((error) => {
                console.log('error', error);
                // res.setHeader('Content-Type', 'application/json');
                res.json({
                    'error' : 'invalid user login'
                });
            });
        }

    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
    //should update user information (username should be username of authorized user)
    // res.sendStatus(404);
};
function deleteUser(req, res) {
    //should delete user profile (username should be username of authorized user)
    if (req.isAuthenticated()) {
        var username = req.params.username;
        User.findOne({ username })
        .remove()
        .exec()
        .then(success => {
            console.log('success', success);
            // res.setHeader('Content-Type', 'application/json');
            res.json(success);
        }).catch(error => {
            console.log('error', error);
            // res.setHeader('Content-Type', 'application/json');
            res.status(403).json({
                message : 'Can not delete: invalid user login'
            });
        });
    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
    // res.sendStatus(404);
};
// console.log(passport);
function login (req, res, next) {
    // console.log();
    // console.log(passport);
    // if (req.user) {
    //     res.redirect('/');
    // }
    // console.log('xhr?' ,req.xhr);
        console.log(req.headers)
    passport.authenticate('local', (err, user, info) => {
        console.log(user);
        console.log('login in..')
        if (err) {
            console.log(err);
            next(err);
        } else {
            if (user) {
                req.logIn(user, (err) => {
                    if (err) {
                        console.log('error while loging in', err);
                        // res.send(JSON.stringify({ message: "unknown error" }));
                        res.status(500).json({message: "unknown error"})
                        next(err);
                    } else {
                        console.log('successfully logged', user, res.user);
                        res.json({
                            message: "success",
                            id: user.id,
                            username: user.username
                        });
                        // res.redirect('/');
                    }
                });
            } else {
                console.log('no user found', info);
                // res.send(JSON.stringify(info));
                res.status(401).json(info);
            }
        }
    })(req, res, next);
}

function logout (req, res) {
    console.log(req.user)
    req.logout();
    console.log('loggin out...')
    // res.send(JSON.stringify({message: "success"}));
    // res.status(200).json({message: "success"});
    res.redirect('/');
}

function whoAmI (req, res, next) {
    console.log('called')
    if (req.isAuthenticated()) {
        res.json({
            userId: req.user.id,
            username: req.user.username
        });
    } else {
        res.status(401).json({
            message: 'unauthorized'
        });
    }
    // next();
}

module.exports = {
    createNewUser,
    getPublicUserInfo,
    updateUser,
    deleteUser,
    login,
    logout,
    whoAmI
    // isValidPassword
}
