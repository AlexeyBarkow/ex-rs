const express = require('express');
const routes = require('./app/config/routes.js');
const app = express();
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const mongoose = require('mongoose');

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

app.use(routes);

app.listen(3000, 'localhost');
