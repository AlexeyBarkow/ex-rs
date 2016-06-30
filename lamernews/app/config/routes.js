'use strict';
const express = require('express');
const path = require('path');//currently not used
const router = express.Router();
// const passport = require('./passport.js');
const db = require('../controllers/db.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./passport.js');
const users = require('../controllers/users.js');
const articles = require('../controllers/articles.js');
const bodyParser = require('body-parser');
// var jsonParser = bodyParser.json({type: 'application/json'});
// router.use()




router.use(cookieParser())
router.use(bodyParser());
router.use(session({ secret: 'SECRET', cookie: {secure: false}}));
router.use(passport.initialize());
router.use(passport.session());
router.get('/articles/:startIndex/:count', articles.sendArticles);
router.get('/articles/random', articles.sendRandomArticle);
router.get('/articles/:id', articles.sendSingleArticle);
router.post('/articles/', articles.createNewArticle);
router.put('/articles/:id', articles.updateArticle);
router.delete('/articles/:id', articles.deleteArticle);
router.post('/like/:id', articles.like);

router.get('/whoislogged', users.whoAmI);
router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/users/:username', users.getPublicUserInfo);
router.post('/register', users.createNewUser);
router.put('/users/:username', users.updateUser);
router.delete('/users/:username', users.deleteUser);
// router.use(router);
router.get('*', function sendIndexHTML (req, res) {
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
});

// router.use(express.cookieParser());
// router.use(express.bodyParser());
// router.use(express.session({ secret: 'SECRET' }))

// router.use(passport.initialize());
// router.use(passport.session());

//function fn (req, res) {
// router.post('/login', passport.authenticate('local', function(req, res) {
//    res.redirect('/users/' + req.user.username);
//}));


module.exports = router;
// {
    // router
    // sendIndexHTML,

    // sendArticles,
    // sendRandomArticle,
    // createNewArticle,
    // updateExistingArticle,
    // deleteArticle,
    // getPublicUserInfo,
    // createNewUser,
    // updateUserInfo,
    // deleteUser
// };
