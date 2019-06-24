const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

// Phaser webpack config
const path = require('path');
const phaserModule = path.join(__dirname, '/node_modules/phaser/');
const phaser = path.join(phaserModule, 'build/custom/phaser-split.js');
const pixi = path.join(phaserModule, 'build/custom/pixi.js');
const p2 = path.join(phaserModule, 'build/custom/p2.js');

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
  },
  module: {
    rules: [
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2
    }
  }
};
