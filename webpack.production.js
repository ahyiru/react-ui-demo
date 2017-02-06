var webpack = require('webpack');
var merge = require('@ersinfotech/merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'production';

module.exports = merge(webpackConfig, {
  devtool: 'source-map',
  cache: false,
  module: {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader:'style-loader',
        use:'css-loader',
      }),
      // exclude: /components/,
    },{
      test: /\.less$/,
      //!从右到左的顺序依次调用less、css加载器，前一个的输出是后一个的输入
      loader: ExtractTextPlugin.extract({
        fallbackLoader:'style-loader',
        use:['css-loader','less-loader'],
        // publicPath:'',
      }),
      // exclude: /components/,
    }],
  },
  plugins: [
    new ExtractTextPlugin({
      filename:'[name]_[contenthash].css',
      allChunks: true,
      disable:false,
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
    /*new webpack.optimize.CommonsChunkPlugin({ //合并公共代码
      name:'common',
      filename:'js/common.js',
      chunks:['index','detail']
    }),*/
  ],
});
