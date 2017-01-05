var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.development');
// var https=require('https');

var webpackDevMiddleware=require('webpack-dev-middleware');
var webpackHotMiddleware=require('webpack-hot-middleware');

var app = express();
var compiler = webpack(webpackConfig);

// const opn = require('opn');

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

  /*
  **  20161229
  **  yiru
  **  server.js
  */
  
  // start mongodb
  var mongoose=require("mongoose");
  mongoose.Promise = require('bluebird');
  // 数据库名称
  var baseUrl='mongodb://localhost:27017/';
  var dataNmae='dataUI';
  var dataUrl=baseUrl+dataNmae;
  // 建立连接
  var dataCom=mongoose.createConnection(dataUrl);
  dataCom.on('error',function(err) {
    console.log('数据库连接失败！'.red);
  });
  dataCom.once('open',function(err) {
    console.log('数据库连接成功！'.green);
  });
  var t={
    name:String,
    schemaList:String,
    role:{type:Number,max:5}
  };
  var dataUISchema = new mongoose.Schema(t);
  // 创建表
  var dataUI=dataCom.model('dataUIs',dataUISchema);
  // add table
  let addTable=(name,sch)=>{
    function getType(type){
      if(type=='Boolean'){
        type=Boolean;
      }else if(type=='Number'){
        type=Number;
      }else if(type=='String'){
        type=String;
      }
      else{
        type=String;
      }
      return type;
    };
    var schema={},head=[];
    Object.keys(sch).forEach((v,k)=>{
      head.push(v);
      schema[v]=getType(sch[v]);
    });
    global[name+'Schema']=new mongoose.Schema(schema);
    !global[name]&&(global[name]=dataCom.model(name+'s',global[name+'Schema']));
    return head;
  };
  //获取数据
  app.get('/table/info',function(req,res){
    var tables=[];
    dataUI.find(function(err,data){
      if(err){
        console.log(err);
        return false;
      }
      data.forEach((v,k)=>{
        var d=JSON.parse(JSON.stringify(v));
        tables.push(d.name);
        var sl=JSON.parse(d.schemaList);
        // console.log(d);
        var head=addTable(d.name,sl);
        // global[d.name]=dataCom.model(d.name+'s',new mongoose.Schema({name:String,type:String}));
        /*global[d.name].find((err,d)=>{
          console.log(d);
        });*/
      });
      res.send(tables);
    });
  });
  //添加数据表
  app.post('/table/add',function(req,res){
    var table=req.body;
    if (!table) {
      console.log(table);
      return;
    }
    var name=table.name;
    var sch=table.schemaList;
    table.schemaList=JSON.stringify(table.schemaList);

    dataUI.findOne({name:name},function(err,data){
      if(err){
        console.log(err);
        return false;
      }
      if(data){
        return res.send({result:'该表名已存在！'});
      }else{
        var add = new dataUI(table);
        add.save(function(err){
          if (err){
            console.log('添加失败！');
            return res.send({result:'添加失败!'+err.message});
          }
          console.log('添加成功！');
          res.send({result:'添加成功！'});
        });
      }
    });
  });
  //删除数据表
  app.post('/table/delete',function(req,res){
    var name=req.body.name;
    if(name){
      global[name].remove({},function(err){
        if(err){
          console.log(err);
          return;
        }
        dataUI.remove({
          name:name
        },function(err){
          if(err){
            console.log(err);
            return;
          }
          // dataCom.disconnect();
          // dataCom.close();
          // dataCom.collections[name+'s'].drop();
          // delete dataCom.collections[name+'s'];
          // delete dataCom.base.modelSchemas[name+'s'];
          // 清空model
          delete dataCom.models[name+'s'];
          global[name]=null;

          console.log('删除成功！');
          res.send({result:'删除成功！'});
        })
      });
    }
  });
  //获取表数据
  app.get('/table/:name/info',function(req,res){
    var name=req.params.name;
    dataUI.findOne({name:name},function(err,data){
      if(err){
        console.log(err);
        return false;
      }
      var sch=JSON.parse(data.schemaList),head=[];
      Object.keys(sch).forEach((v,k)=>{
        head.push(v);
      });
      console.log('获取表成功！');
      global[name].find((err,d)=>{
        if(err){
          console.log(err);
          return;
        }
        res.send({head:head,tbody:d});
      });
    });
  });
  //添加表数据
  app.post('/table/:name/add',function(req,res){
    var name=req.params.name;
    var tbody=req.body;

    if (!tbody) {
      console.log(tbody);
      return;
    }
    var add = new (global[name])(tbody);
    add.save(function(err){
      if (err){
        console.log('添加失败！');
        return res.send({result:'添加失败!'+err.message});
      }
      console.log('添加成功！');
      // res.send({result:'添加成功！'});
      (global[name]).find((err,d)=>{
        if(err){
          console.log(err);
          return;
        }
        res.send({tbody:d});
      });
    });
  });
  //更新表数据
  app.post('/table/:name/update',function(req,res){
    var name=req.params.name;
    var data=req.body;

    if(!data){
      console.log(data);
      return;
    }

    (global[name]).update({_id:data._id},{
      $set:data.tr
    },function(err){
      if(err){
        console.log(err);
        return res.send(err.message);
      }
      console.log('更新成功！');
      // console.log(res.statusCode);
      res.status(res.statusCode).send({result:'添加成功！'});
    });
  });
  //删除表数据
  app.post('/table/:name/delete',function(req,res){
    var name=req.params.name;

    var id=req.body._id;
    if(id){
      (global[name]).remove({
        _id:id
      },function(err){
        if(err){
          console.log(err);
          return;
        }
        console.log('删除成功！');
        res.send({result:'删除成功！'});
      });
    }
  });
  // 将table导出为json文件
  app.get('/table/:name/toJson',function(req,res){
    var name=req.params.name;

    (global[name]).find(function(err,data){
      if(err){
        console.log(err);
        return false;
      }
      data=JSON.stringify(data);
      // data='export const '+name+'='+data;
      // console.log(data);
      var filename=path.join(__dirname,'../demo/models/'+name+'.json');
      fs.writeFile(filename,data,function(err){
        if(err){
          console.log(err);
          return false;
        }
        res.send({result:'OK'});
      });
    });
  });
  // end

app.listen(app.get('port'),(err)=>{
  if (err) {
    console.log(err);
    return false;
  }
  console.log('监听端口:'+ app.get('port') +', 正在构建,请稍后...');
  // opn('http://localhost:'+app.get('port'));
});
