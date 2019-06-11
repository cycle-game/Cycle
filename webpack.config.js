const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname + '/dist',
        filename: 'main.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Cycle',
            template: './src/index.html'
        }),
        new CopyPlugin([
            { from: 'src/Ressources', to: 'Ressources' },
        ]),
    ],
    devServer: {
        contentBase: __dirname + '/dist',
        compress: true,
        port: 9000
    }
};
