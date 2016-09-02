var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development');
var https=require('https');

var app = express();
var compiler = webpack(webpackConfig);

app.use(require('webpack-dev-middleware')(compiler, {
	// publicPath: webpackConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true,
  },
}));

app.use(require('webpack-hot-middleware')(compiler));

app.set('port', process.env.PORT || 8000);

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
