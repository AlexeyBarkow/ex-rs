const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
    entry:
        [
            'webpack/hot/dev-server',
            './app.js',
            'webpack-dev-server/client?http://localhost:3000'
        ],
    output: {
        path: path.join(__dirname, './assets/'),
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.json', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                loader: 'style-loader!css-loader'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
            new WebpackNotifierPlugin(),
            // new ExtractTextPlugin('style.css'),
            new webpack.HotModuleReplacementPlugin()
        ],
    devServer: {
        hot: true,
        contentBase: __dirname,
        publicPath: '/assets/',
        host: 'localhost',
        port: 3000
    }
}
