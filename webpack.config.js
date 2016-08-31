var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: [__dirname + '/demo/index'],
  },
  output: {
    // path.join 路径结合、合并.
    // path.resolve 获取绝对路径.
    path: path.resolve(__dirname, 'dist'), // 内存中生成文件的路径
    // publicPath: '../', // 绝对地址
    filename: '[name]_[hash:8].js',
  },
  resolve: {
    root: [
      __dirname + '/demo',
      __dirname + '/node_modules',
      __dirname,
    ],
    extensions: ['', '.js', '.jsx'],
  },
  module: {
    loaders: [{
      test: /\.js[x]?$/,
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
      loader: 'file?name=img_[hash:8].[ext]',
    }, {
      test: /\.(ttf|eot|svg|woff|woff2)/,
      loader: 'file',
    }, {
      test: /\.(pdf)/,
      loader: 'file',
    }, {
      test: /\.(swf|xap)/,
      loader: 'file',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:'React UI Demo',
      template: __dirname + '/demo/index.html',
      favicon: __dirname + '/demo/favicon.ico',
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
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
};
