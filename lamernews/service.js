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

router.get('/', routes.sendIndexHTML);
router.get('/articles/:startIndex/count?sort', routes.sendArticles);
router.get('/articles/random', routes.sendRandomArticle);
router.post('/articles/', routes.createNewArticle);
router.put('/articles/:id', routes.updateExistingArticle);
router.delete('/articles/:id', routes.deleteArticle);
router.get('/users/:username', routes.getPublicUserInfo);
router.post('/users/:username', jsonParser, routes.createNewUser);
router.put('/users/:username', jsonParser, routes.updateUserInfo);
router.delete('/users/:username', routes.deleteUser);
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
