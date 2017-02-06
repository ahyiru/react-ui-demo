var webpack = require('webpack');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// var HappyPack = require('happypack');
// var happyThreadPool = HappyPack.ThreadPool({ size: require('os').cpus().length });

var appName=require('./package').name;

// var src='/demo';
const src = path.resolve(process.cwd(), 'demo');
const nodeModules = path.resolve(process.cwd(), 'node_modules');

module.exports = {
  context: src,
  // http://webpack.github.io/docs/configuration.html
  // https://webpack.github.io/docs/webpack-dev-server.html#webpack-dev-server-cli
  /*devServer: {
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
    app: [ path.resolve(src, 'index.tsx')]
  },
  output: {
    // path.join 路径结合、合并.
    // path.resolve 获取绝对路径.
    path: path.resolve(__dirname, '_dist'), // 内存中生成文件的路径
    // publicPath: '/', // 绝对地址,资源存放路径
    filename: '[name]_[hash:8].js',
    libraryTarget:'umd',
  },
  resolve: {
    modules: [
      // path.join(__dirname, 'demo'),
      // path.join(__dirname, 'node_modules'),
      src,
      nodeModules,
    ],
    extensions: ['.js','.jsx','.ts','.tsx','.json','.css','.less'],
  },
  /*externals:{
    // 'AMap':'AMap',
    // 'BMap':'BMap',
    // 'react':true,
    // 'react-router':true,
    // 'react-dom':true,
    // 'echarts':true,
  },*/
  module: {
    rules: [/*{
      test: /\.tsx?$/,
      enforce: "pre",
      loader:'tslint',
      exclude: [nodeModules],
    }, */{
      test: /\.jsx?$/,
      loader:'babel-loader',
      exclude: [nodeModules],
      // include: [src,nodeModules],
    }, {
      test: /\.tsx?$/,
      use:['babel-loader','ts-loader'],
      exclude: [nodeModules],
      // include: [src,nodeModules],
    },/* {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: [src,nodeModules],
    }, {
      test: /\.less$/,
      use: ['style-loader', 'css-loader', 'less-loader'],
      // include: /demo/,
      include: [src,nodeModules],
    },*/ {
      test: /\.(jpe?g|png|gif|svg|ico)/i,
      loader: 'file-loader?name=img/img_[hash:8].[ext]',
    }, /*,{
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192' //小于8K的图片将直接以base64的形式内联在代码中
    }*/{
      test: /\.(ttf|eot|svg|woff|woff2)/,
      loader: 'file-loader',
    }, {
      test: /\.(pdf)/,
      loader: 'file-loader',
    }, {
      test: /\.(swf|xap)/,
      loader: 'file-loader',
    }],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title:appName,
      template: path.resolve(src, 'index.html'),
      favicon: path.resolve(src, 'favicon.ico'),
      inject: false,
      minify: {
        html5: true,
        collapseWhitespace: true,
        // conservativeCollapse: true,
        removeComments: true,
        removeTagWhitespace: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        /*useShortDoctype: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,*/
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      // debug: true
    }),
    /*new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })*/
  ],
};
