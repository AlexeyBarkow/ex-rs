const express = require('express');
const path = require('path');//currently not used
const router = express.Router();
const users = require('../controllers/users.js');
const articles = require('../controllers/articles.js');
const passport = require('./passport.js');
const db = require('../controllers/db.js');


mongoose.connect('mongodb://localhost:27017/lamernews_db');
router.get('/', (req, res) => {
    res.sendFile('/public/index.html', {'root': __dirname + '../../../'});
});

router.use(express.cookieParser());
router.use(express.bodyParser());
router.use(express.session({ secret: 'SECRET' }))

router.use(passport.initialize());
router.use(passport.session());

routes.post('/login', passport.authenticate('local', function(req, res) {
    res.redirect('/users/' + req.user.username);
});


module.exports = router;
