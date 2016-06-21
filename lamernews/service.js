const express = require('express');
const routes = require('./app/config/routes.js');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');
const router = express.Router();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./app/config/passport.js');
const users = require('./app/controllers/users.js');
const articles = require('./app/controllers/articles.js');
var jsonParser = bodyParser.json({type: 'application/json'});

try {
    mongoose.connect('mongodb://localhost:27017/lamernews_db');
} catch(e) {
    console.log('Cannot connect to mongodb');
}


app.use(webpackDevMiddleware(compiler, {
        hot: true,
        filename: 'bundle.js',
        publicPath: webpackConfig.output.publicPath,
        stats: {
            colors: true
        }
}));

app.use(webpackHotMiddleware(compiler, {
    log: console.log
}));
// router.use(bodyParser);

router.use(cookieParser('SECRET'));
router.use(session({ secret: 'SECRET' }));
router.use(bodyParser());
router.use(passport.initialize());
router.use(passport.session());
// console.log(passport);
// router.
router.get('/articles/:startIndex/:count', articles.sendArticles);
router.get('/articles/random', articles.sendRandomArticle);
router.post('/articles/', articles.createNewArticle);
router.put('/articles/:id', articles.updateArticle);
router.delete('/articles/:id', articles.deleteArticle);


router.post('/login', users.login);
router.post('/logout', users.logout);
router.get('/users/:username', users.getPublicUserInfo);
router.post('/register', jsonParser, users.createNewUser);
router.put('/users/:username', jsonParser, users.updateUser);
router.delete('/users/:username', users.deleteUser);
router.get('*', routes.sendIndexHTML);
app.use(router);

// console.log(webpackConfig)

app.listen(3000, 'localhost');


// var db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error:'));
// // db.once('open', () => {
// //     dropAllTables();
// //     var newOne = users.addNewUser('Tom', '0112358', 'ex@mail.ru');
// //     articles.addNewArticle(newOne, 'Test title', 'www.ex.com');
// // });
// dropAllTables();
// app.listen(3000, 'localhost');
// app.get('/', function(req, res) {
//
// })
