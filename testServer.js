var express = require('express');

var app = express();

app.set('port', process.env.PORT || 8001);

//test
app.get('/get/test',(req,res)=>{
  res.send({
    'name':'test',
    'age':18
  });
});

app.post('/post/test',(req,res)=>{
  res.send('你提交了:'+req.body);
});

app.listen(app.get('port'),(err)=>{
  if (err) {
    console.log(err);
  }
  console.log('监听端口:'+ app.get('port'));
});
