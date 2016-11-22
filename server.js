var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development');
// var https=require('https');

var webpackDevMiddleware=require('webpack-dev-middleware');
var webpackHotMiddleware=require('webpack-hot-middleware');

var app = express();
var compiler = webpack(webpackConfig);

var PORT=8086;

app.use(webpackDevMiddleware(compiler, {
	// publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: false,
  compress: true, 
  noInfo: true,
  stats: {
    colors: true,
  },
}));

app.use(webpackHotMiddleware(compiler));

app.set('port', process.env.PORT || PORT);

//test
/*app.get('/api/test',(req,res)=>{
  var data='';
  https.get('http://localhost:3000/server/data.json',(ress)=>{
    ress.on('data',(d)=>{
      // process.stdout.write(d);
      data+=d;
    })
    .on('end',()=>{
      return res.send(data);
    });
  })
  .on('error',(e)=>{
    console.error(e);
  });
});*/

app.listen(app.get('port'),(err)=>{
  if (err) {
    console.log(err);
  }
  console.log('监听端口:'+ app.get('port') +', 正在构建,请稍后...');
});
