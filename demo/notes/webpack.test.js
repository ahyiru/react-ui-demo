var webpack = require('webpack');
var path = require('path');
module.exports = {

  entry: {
    /*app1:'./demo/components/base/ypageheader.tsx',
    app2:'./demo/components/base/ybacktop.tsx',
    app3:'./demo/components/base/ynotify.tsx',
    app4:'./demo/components/aside/ysidebar.tsx',
    app5:'./demo/components/aside/yrightbar.tsx',
    app6:'./demo/components/header/ynav.tsx'*/
    /*app:['./demo/components/base/ypageheader.tsx','./demo/components/base/ybacktop.tsx','./demo/components/base/ynotify.tsx','./demo/components/aside/ysidebar.tsx','./demo/components/aside/yrightbar.tsx','./demo/components/header/ynav.tsx']*/
    app:'./index.tsx'
  },
  output: {
    path: './ytest',

    // filename: 'ypageheader.js',
    // library:'YpageHeader',
    // filename: 'ybacktop.js',
    // library:'YbackTop',
    // filename: 'ynotify.js',
    // library:'Ynotify',
    // filename: 'ysidebar.js',
    // library:'YsideBar',
    // filename: 'yrightbar.js',
    // library:'YrightBar',
    // filename: 'ynav.js',
    // library:'Ynav',
    filename:'yrui.js',
    library:'yrui',

    libraryTarget:'umd',
    umdNamedDefine:true
  },

  resolve: {
    root: [
      './demo'
    ],
    extensions: ['', '.js', '.jsx','.ts','.tsx'],
  },

  externals:{//externals使用场景是外部依赖不需要打包进bundle
    'react':true,
    'react-router':true,
    'react-dom':true,
    'echarts':true
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel','ts'],
      exclude: /node_modules/
    }, {
      test: /\.jsx?$/,
      loaders: ['babel'],
      exclude: /node_modules/,
    }],
  }
};
