const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    mode: 'production',
    stats: 'errors-only',
    devtool: 'source-map',
});
