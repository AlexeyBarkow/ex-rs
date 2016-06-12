const express = require('express');
const path = require('path');//currently not used
const users = require('../controllers/users.js');
const articles = require('../controllers/articles.js');
const passport = require('./passport.js');
const db = require('../controllers/db.js');
// router.use()

function sendIndexHTML (req, res) {
    res.sendFile('/public/index.html', {'root': __dirname + '../../../'});
};

function sendArticles (req, res) {

    //should return json array with list of count articles starting from startIndex sorted in sort order (latest|top)
    console.log(req);
    res.sendStatus(404);
};
function sendRandomArticle (req, res) {

    //should return random article
    res.sendStatus(404);
};
function createNewArticle (req, res) {

    //should create new article

    res.sendStatus(404);
};
function updateExistingArticle (req, res) {

    //should update existing article
    res.sendStatus(404);
};
function deleteArticle (req, res) {

    //should delete existing article
    res.sendStatus(404);
};

function getPublicUserInfo (req, res) {

    //should return public user info
    // console.log(req.query, req.body, req.params);
    // var username = req.params.username;
    users.getUserByUsername(req.params.username)
    .then((user) => {
        // console.log('user',user);
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(user));
        } else {
            res.sendStatus(404);
        }

    });
    // console.log('user',user);
    // res.sendStatus(404);
};
function createNewUser (req, res) {
    // router.use(bodyParser());
    // console.log(req.body);
    //should create new user if username isn't taken already
    users.addNewUser(req.params.username.toLowerCase(), req.body.password, req.body.email.toLowerCase())
    .then((user) => {
        console.log(user);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(user));
    }).catch((error) => {
        console.log('error', error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            'error' : 'login or email is already used'
        }));
    });
    // res.sendStatus(404);
};
function updateUserInfo (req, res) {
    users.updateUser(req.params.username, req.body.username, req.body.password, req.body.email)
    .then((success) => {
        console.log(success);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(success));
    }).catch((error) => {
        console.log('error', error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            'error' : 'invalid user login'
        }));
    });
    //should update user information (username should be username of authorized user)
    // res.sendStatus(404);
};
function deleteUser(req, res) {
    users.deleteUser(req.params.username).then(success => {
        console.log('success', success);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(success));
    }).catch(error => {
        console.log('error', error);
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify({
            'error' : 'Can not delete: invalid user login'
        }));
    });
    //should delete user profile (username should be username of authorized user)
    // res.sendStatus(404);
};
// router.use(express.cookieParser());
// router.use(express.bodyParser());
// router.use(express.session({ secret: 'SECRET' }))

// router.use(passport.initialize());
// router.use(passport.session());

//function fn (req, res) {
// router.post('/login', passport.authenticate('local', function(req, res) {
//    res.redirect('/users/' + req.user.username);
//}));


module.exports =  {
    // router
    sendIndexHTML,
    sendArticles,
    sendRandomArticle,
    createNewArticle,
    updateExistingArticle,
    deleteArticle,
    getPublicUserInfo,
    createNewUser,
    updateUserInfo,
    deleteUser
};
