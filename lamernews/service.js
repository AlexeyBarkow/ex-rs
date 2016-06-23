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

mongoose.connect('mongodb://localhost:27017/lamernews_db');



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



app.use(cookieParser())
app.use(bodyParser());
app.use(session({ secret: 'SECRET', cookie: {secure: false}}));
app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, X-AUTHENTICATION, X-IP, Content-Type, Accept')
//   res.header( 'Access-Control-Allow-Credentials', true)
//   res.header ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//   next()
// })
// console.log(passport);
// router.
app.get('/articles/:startIndex/:count', articles.sendArticles);
app.get('/articles/:id', articles.sendSingleArticle);
app.get('/articles/random', articles.sendRandomArticle);
app.post('/articles/', articles.createNewArticle);
app.put('/articles/:id', articles.updateArticle);
app.delete('/articles/:id', articles.deleteArticle);
app.post('/like/:id', articles.like);

app.get('/whoislogged', users.whoAmI);
app.post('/login', users.login);
app.post('/logout', users.logout);
app.get('/users/:username', users.getPublicUserInfo);
app.post('/register', jsonParser, users.createNewUser);
app.put('/users/:username', jsonParser, users.updateUser);
app.delete('/users/:username', users.deleteUser);
// app.use(router);
app.get('*', routes.sendIndexHTML);

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
