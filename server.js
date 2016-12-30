var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development');
// var https=require('https');

var webpackDevMiddleware=require('webpack-dev-middleware');
var webpackHotMiddleware=require('webpack-hot-middleware');

var app = express();
var compiler = webpack(webpackConfig);

const opn = require('opn');

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

app.use(function(req,res,next){
    console.log('test');
    next();
});

app.set('port', process.env.PORT || PORT);

//  start server
var cors=require('cors');
var logger=require('morgan');
var bodyParser=require('body-parser');  // 数据解析

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

if(app.get('env')==='production'){
  app.use(function(req,res,next) {
    var protocol=req.get('x-forwarded-proto');
    protocol=='https'?next():res.redirect('https://'+req.hostname+req.url);
  });
}
// start post test
app.get('/test/get',function(req,res){
  res.send({test:'get'});
});
app.post('/test/post',function(req,res){
  console.log(req.body);
  res.send(req.body);
});
// end post test
// 
//  end server

// 设置跨域访问，方便开发
/*app.all('*',function(req,res,next){
  res.header("Access-Control-Allow-Origin","*");
  res.header("Access-Control-Allow-Headers","X-Requested-With,accept,origin,content-type");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By","3.2.1");
  res.header("Content-Type","application/json;charset=utf-8");
  next();
});*/

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

// start md2html
var fs=require('fs');
var path=require('path');
var marked=require('marked');
var hl=require('highlight.js');

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  highlight: function (code) {
    return hl.highlightAuto(code).value;
  }
});

app.get('/api',function(request,response,next){
  var src=fs.readdirSync(path.join(__dirname,'doc')).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file.indexOf('.md') > 0);
  });
  response.send({src:src});
});
// app.get('/api',function(request,response,next){
  fs.readdirSync(path.join(__dirname,'doc')).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file.indexOf('.md') > 0);
  }).forEach(function (file) {
    // console.log(file.slice(0,-3));
    app.get('/api/'+encodeURI(file),(req,res)=>{
      fs.readFile(path.join(__dirname+'/doc',file),'utf8',(err,data)=>{ //readFileSync //同步
        if(err){
          throw err;
        }else{
          // var html=marked(data.toString());
          res.send({html:marked(data)});
        }
      });
    });
  });
// });
// end md2html



app.listen(app.get('port'),(err)=>{
  if (err) {
    console.log(err);
    return false;
  }
  console.log('监听端口:'+ app.get('port') +', 正在构建,请稍后...');
  // opn('http://localhost:'+app.get('port'));
});
