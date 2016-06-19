const path = require('path');
const webpack = require('webpack');
const WebpackNotifierPlugin = require('webpack-notifier');


module.exports = {
    entry:
        [
            'webpack-hot-middleware/client',
            'webpack/hot/dev-server',
            './public/scripts/index.js',
            // 'webpack-dev-server/client?http://localhost:3000'
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
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: [
                        'es2015',
                        'react',
                        'stage-0'
                    ]
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.html/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?hash=sha512&digest=hex&name=[hash].[ext]',
                    'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
                ]
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
    // devServer: {
    //    hot: true,
    //    contentBase: __dirname,
    //    publicPath: '/dist/',
    //     host: 'localhost',
    //     port: 3000
    // }
}
