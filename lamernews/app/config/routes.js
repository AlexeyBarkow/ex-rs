const express = require('express');
const router = express.Router();
const webpack = require('webpack');
const webpackConfig = require('../../webpack.config.js');
const compiler = webpack(webpackConfig);
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

router.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});
router.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: webpackConfig.output.publicPath,
    stats: {
        colors: true
    }
}));

router.use(webpackHotMiddleware(compiler, {
    log: console.log
}));

module.exports = router;
