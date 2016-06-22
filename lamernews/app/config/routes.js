'use strict';
const express = require('express');
const path = require('path');//currently not used

// const passport = require('./passport.js');
const db = require('../controllers/db.js');
// router.use()

function sendIndexHTML (req, res) {
    // console.log('trying to send...')

    // if (req.get())
    console.log('logged user to send ', req.user)
    console.log('sending index.html...')
    let options = {
        'root': __dirname + '../../../'
    };
    if (req.isAuthenticated()){
        console.log('sending userId...', req.user.id);
        options.headers = {
            id: req.user.id
        }
    }
    res.status(200).sendFile('/public/index.html', options);

    // snext(req,res);
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
    // sendArticles,
    // sendRandomArticle,
    // createNewArticle,
    // updateExistingArticle,
    // deleteArticle,
    // getPublicUserInfo,
    // createNewUser,
    // updateUserInfo,
    // deleteUser
};
