var webpack = require('webpack');
var merge = require('@ersinfotech/merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackConfig, {
  module: {
    loaders: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style','css'),
      exclude: /components/,
    },{
      test: /\.less$/,
      //!从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
      loader: ExtractTextPlugin.extract('style','css!less'),
      exclude: /components/,
    }],
  },
  plugins: [
    new ExtractTextPlugin('[name]_[contenthash].css', {
      allChunks: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false,  // remove all comments
      },
      compress: {
        warnings: false,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
    }),
  ],
});
