const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 9000,
    },
    devtool: 'inline-source-map',
});
