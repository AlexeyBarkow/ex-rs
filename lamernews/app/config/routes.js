'use strict';
const express = require('express');
const router = express.Router();
const db = require('../controllers/db.js');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./passport.js');
const users = require('../controllers/users.js');
const articles = require('../controllers/articles.js');
const comments = require('../controllers/comments.js');
const bodyParser = require('body-parser');

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

router.post('/comment/:id', comments.postComment);
router.delete('/comment/:commentId', comments.deleteComment);

router.get('/whoislogged', users.whoAmI);
router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/users/:username', users.getPublicUserInfo);
router.post('/register', users.createNewUser);
router.put('/users/:username', users.updateUser);
router.delete('/users/:username', users.deleteUser);

router.get('*', function sendIndexHTML (req, res) {
    let options = {
        'root': __dirname + '../../../'
    };
    if (req.isAuthenticated()){
        options.headers = {
            id: req.user.id
        }
    }
    res.status(200).sendFile('/public/index.html', options);
});

module.exports = router;
