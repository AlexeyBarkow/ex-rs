const express = require('express');
const router = require('./app/config/routes.js');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');


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
