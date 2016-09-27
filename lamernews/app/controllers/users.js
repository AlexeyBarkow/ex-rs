'use strict';
const User = require('../models/user.js');
const Article = require('../models/article.js');
const passport = require('./../config/passport.js');

function getPublicUserInfo (req, res, next) {
    if (req.get('Content-Type')) {
        let username = req.params.username;
        if (username === 'home' && req.user) {
            username = req.user.username;
        }
        User.findOne({
            username: username.toLowerCase()
        }, 'username email registrationDate')
        .then((user) => {
            console.log('user',user);
            if (user) {
                Article.find({
                    author: user._id
                }).populate('author').then(articles => {
                    user = user.toObject();
                    user.articles = articles;
                        console.log(user);
                    res.json(user);
                }).catch(error => {
                    console.log(error);
                    res.status(500).json({
                        message: error
                    });
                });
            } else {
                res.status(404).json({
                    message: 'user not found'
                });
            }
        });
    } else {
        next();
    }
}

function createNewUser (req, res) {
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
        .then((user) => {
            res.json({ 'message' : 'success' });
        }).catch((error) => {
            console.log('error', error);
            res.json({
                'message' : error.errmsg
            });
        });
}


function updateUser (req, res) {
    if (req.isAuthenticated()) {
        let newData = {};
        let username = req.user.username;

        if (username !== req.params.username) {
            res.sendStatus(403);
        } else {
            const newUsername = req.body.username;
            const newPassword = req.body.password;
            const newEmail = req.body.email;
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

            .then((success) => {
                res.json(success);
            }).catch((error) => {
                console.log('error', error);
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
}

function deleteUser(req, res) {
    if (req.isAuthenticated()) {
        const username = req.params.username;
        User.findOne({ username })
        .remove()
        .exec()
        .then(success => {
            res.json(success);
        }).catch(error => {
            console.log('error', error);
            res.status(403).json({
                message : 'Can not delete: invalid user login'
            });
        });
    } else {
        res.status(401).json({
            message: 'not authenticated'
        });
    }
};

function login (req, res, next) {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.log(err);
            next(err);
        } else {
            if (user) {
                req.logIn(user, (err) => {
                    if (err) {
                        console.log('error while loging in', err);

                        res.status(500).json({message: "unknown error"})
                        next(err);
                    } else {
                        console.log('successfully logged', user, res.user);
                        res.json({
                            message: "success",
                            id: user.id,
                            username: user.username
                        });
                    }
                });
            } else {
                console.log('no user found', info);
                res.status(401).json(info);
            }
        }
    })(req, res, next);
}

function logout (req, res) {
    req.logout();
    res.json({message: 'successfully logged out'});
}

function whoAmI (req, res, next) {
    if (req.isAuthenticated()) {
        res.json({
            userId: req.user.id,
            username: req.user.username
        });
    } else {
        res.json({
            message: 'unauthorized'
        });
    }
}

module.exports = {
    createNewUser,
    getPublicUserInfo,
    updateUser,
    deleteUser,
    login,
    logout,
    whoAmI
}
