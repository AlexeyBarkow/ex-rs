const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    entry:
        [
            'webpack/hot/dev-server',
            './public/index.js',
            'webpack-dev-server/client?http://localhost:3000'
        ],
    output: {
        path: path.join(__dirname, './dist/'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['', '.js', '.css']
    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html/,
                loader: 'file?name=[name].[ext]'
            }
        ]
    },
    // resolve: {
    //     modulesDirectories: ['./public']
    // },
    devtool: 'source-map',
    plugins: [
        new WebpackNotifierPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        hot: true,
        contentBase: __dirname,
        publicPath: '/dist/',
        host: 'localhost',
        port: 3000
    }
}
