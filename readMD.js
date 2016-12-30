var express = require('express');
var app = express();

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

app.get('/api',function(req,res,next){
  fs.readdirSync(path.join(__dirname,'doc')).filter(function (file) {
    return (file.indexOf('.') !== 0) && (file.indexOf('.md') > 0);
  }).forEach(function (file) {
    // console.log(file.slice(0,-3));
    fs.readFile(file,'utf8',(err,data)=>{ //readFileSync //同步
      if(err){
        throw err;
      }else{
        // var html=marked(data.toString());
        res.send(marked(data));
      }
    });
  });
});


