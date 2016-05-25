const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
module.exports = {
    entry: './app.js',
    output: {
        path: path.join(__dirname, './assets/'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
            }
        ],
    },
    devtool: 'source-map',
    plugins: [
        new WebpackNotifierPlugin(),
        new ExtractTextPlugin('style.css')
    ]
};
