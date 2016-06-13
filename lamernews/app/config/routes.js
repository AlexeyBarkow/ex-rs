const express = require('express');
const path = require('path');//currently not used
// const passport = require('./passport.js');
const db = require('../controllers/db.js');
// router.use()

function sendIndexHTML (req, res) {
    res.sendFile('/public/index.html', {'root': __dirname + '../../../'});
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
