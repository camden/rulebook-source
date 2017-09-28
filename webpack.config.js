var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var Dotenv = require('dotenv-webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['babel-polyfill', 'whatwg-fetch', './client/index.js'],
  output: {
    path: path.join(__dirname, 'dist/client'),
    publicPath: '/',
    filename: 'static/js/[name].[chunkhash].js',
  },
  resolve: {
    modules: [path.resolve(__dirname, 'client'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env',
      safe: false,
      systemvars: true,
    }),
    // https://webpack.js.org/plugins/module-concatenation-plugin/
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      comments: false, // remove comments
      mangle: process.env.NODE_ENV === 'production',
      compress: {
        booleans: true,
        conditionals: true,
        dead_code: true, // big one--strip code that will never execute
        drop_debugger: false,
        evaluate: true,
        sequences: true,
        unused: true,
        warnings: false, // good for prod apps so users can't peek behind curtain
      },
    }),
    // https://webpack.js.org/guides/caching/
    // This plugin extracts webpack's boilerplate and manifest which can change with every build
    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime',
    }),
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
};
