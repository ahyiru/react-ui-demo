var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var appName=require('./package').name;

var src='/demo';

module.exports = {

  /*//https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
  devServer: {
    contentBase: './dist', //Content base
    inline: true, //Enable watch and live reload
    host: 'localhost',
    port: 8080,
    hot:true,
    historyApiFallback:true,
    progress:true
  },
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: 'source-map',*/

  entry: {
    app: [__dirname + src + '/index']
  },
  output: {
    // path.join 路径结合、合并.
    // path.resolve 获取绝对路径.
    path: path.resolve(__dirname, '_dist'), // 内存中生成文件的路径
    // publicPath: '/', // 绝对地址,资源存放路径
    filename: '[name]_[hash:8].js',
  },
  resolve: {
    root: [
      __dirname + src,
      __dirname + '/node_modules',
      __dirname,
    ],
    extensions: ['', '.js', '.jsx','.ts','.tsx'],
  },
  externals:{
    "AMap":"AMap",
    "BMap":"BMap"
  },
  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel','ts'],
      exclude: /node_modules/,
    }, {
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      loaders: ['style', 'css'],
      include: /components/,
    }, {
      test: /\.less$/,
      loaders: ['style', 'css', 'less'],
      include: /components/,
    }, {
      test: /\.(jpe?g|png|gif|svg|ico)/i,
      loader: 'file?name=img/img_[hash:8].[ext]',
    }, /*,{
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192' //小于8K的图片将直接以base64的形式内联在代码中
    }*/{
      test: /\.(ttf|eot|svg|woff|woff2)/,
      loader: 'file',
    }, {
      test: /\.(pdf)/,
      loader: 'file',
    }, {
      test: /\.(swf|xap)/,
      loader: 'file',
    }, {
      test: /\.json/,
      loader: 'file',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:appName,
      template: __dirname + src + '/index.html',
      favicon: __dirname + src + '/favicon.ico',
      inject: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        // conservativeCollapse: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
      }
    }),
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })*/
  ],
};
