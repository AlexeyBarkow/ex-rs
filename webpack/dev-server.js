var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var reqHandler = require('./handler');
var devServer = new WebpackDevServer(
    webpack(config),
    {
        contentBase: __dirname,
        publicPath: '/assets/'
    }
).listen(3000, 'localhost');

// devServer.on('request', reqHandler);
