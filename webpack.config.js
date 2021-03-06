const path = require('path');
const webpack = require('webpack');

const mode = process.env.MODE || 'development';

module.exports = {
  mode,
  entry: {
    index: [
      'babel-polyfill',
      'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
      './src/index.js'
    ]
  },
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  externals: '/node_modules/',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    contentBase: './dist',
    hot: true
  }
}
