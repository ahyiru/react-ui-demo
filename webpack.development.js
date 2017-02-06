var webpack = require('webpack');
var merge = require('@ersinfotech/merge');// 合并多个对象为一个新的对象

var webpackConfig = require('./webpack.config');

process.env.NODE_ENV = 'development';

module.exports = merge(webpackConfig, {
  devtool: 'eval',
  // devtool: 'cheap-module-source-map',
  cache: true,
  bail: false,
  target: 'web',
  // debug: true, //😢!!!
  entry: {
    app: ['webpack-hot-middleware/client'],
    login: ['webpack-hot-middleware/client'],
  },
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      // exclude: [/node_modules/],
    },{
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      // exclude: [/node_modules/],
    }],
  },
  plugins: [
    // Webpack 1.0
    // new webpack.optimize.OccurenceOrderPlugin(),
    // Webpack 2.0 fixed this mispelling 
    // new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(/*{multiStep: true}*/),
    // new webpack.NoErrorsPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.DefinePlugin({ // 设置环境变量来压缩代码
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    }),
  ],
});
