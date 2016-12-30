var fs=require('fs');
var http=require('http');
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


var filename='./doc/nodejs.md';

fs.readFile(filename,'utf8',(err,data)=>{ //readFileSync //同步
  if(err){
    console.log(err);
    throw err;
  }else{
    var html=marked(data.toString());
    // console.log(marked(data));
    server(marked(data));
  }
});

var server=(html)=>{
  http.createServer((req,res)=>{
    res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
    res.write(`<html><head><title>Simple HTTP Server</title><link rel="stylesheet" href="//cdn.bootcss.com/highlight.js/9.8.0/styles/monokai-sublime.min.css">
      <style>
        code{
          display:block;
          width:60%;
          background:#333;
          border-radius:5px;
          padding:10px;
          color:#eee;
          overflow-x:auto;
        }
      </style>
    </head><body>`);
    res.write(html);
    res.end('\n</body></html>');
  }).listen(1337,'127.0.0.1');
  console.log('server running at http://127.0.0.1:1337/');
};
