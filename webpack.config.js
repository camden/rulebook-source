var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: ['whatwg-fetch', './client/index.jsx'],
  output: {
    path: path.join(__dirname, 'dist/client'),
    publicPath: '/',
    filename: 'static/js/bundle.js',
  },
  resolve: {
    modules: ['node_modules', path.resolve(__dirname, 'client')],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: path.join(__dirname, 'client'),
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'client/index.html',
    }),
  ],
};
