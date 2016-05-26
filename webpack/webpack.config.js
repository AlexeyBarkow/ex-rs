const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
// module.exports = {
//     entry:
//         [
//             './app.js',
//             'webpack-dev-server/client?http://localhost:3000'
//             // 'webpack/hot/only-dev-server'
//
//         ],
//     output: {
//         path: path.join(__dirname, './assets/'),
//         filename: 'bundle.js'
//     },
//     resolve: {
//         extensions: ['', '.js', '.json', '.css']
//     },
//     module: {
//         loaders: [
//             {
//                 test: /\.css$/,
//                 loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
//             }
//         ],
//     },
//     devtool: 'source-map',
//     plugins: [
//         new WebpackNotifierPlugin(),
//         new ExtractTextPlugin('style.css'),
// 		new webpack.optimize.UglifyJsPlugin()
//         // new webpack.HotModuleReplacementPlugin()
//     ],
//     devServer: {
//         hot: true,
//         contentBase: __dirname,
//         publicPath: '/assets/',
//     }
// };
module.exports = {
    entry:
        [
            './app.js',
            'webpack-dev-server/client?http://localhost:3000'
        ],
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
                // loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                loader: 'style-loader!css-loader'
            }
        ]
    },
    devtool: 'source-map',
    plugins: [
            new WebpackNotifierPlugin(),
            // new ExtractTextPlugin(),
    		// new webpack.optimize.UglifyJsPlugin()
            // new webpack.HotModuleReplacementPlugin()
        ],
    devServer: {
        // hot: true,
        contentBase: __dirname,
        publicPath: './assets/',
        // port: 3000
    }
}
