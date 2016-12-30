# nodejs

## npm

#### 1.打开 package 主页

`npm home $package`

#### 2.打开 package Github 仓库

`npm repo $package`

#### 3.检查 package 的过时依赖

`npm outdated`

#### 4.检查 package.json 中未声明的 package

`npm prune`




## 资料

### 1.http

	require(`http`)
	  .createServer()
	  .listen({
	    port: 8080,
	    host: `localhost`,
	  })
	  .on(`request`, (req, res) => {
	    res.end(`Hello World!`);
	  });

### 2.相对地址

	const fs = require(`fs`);
	const path = require(`path`);
	// why have I always done this...
	fs.readFile(path.join(__dirname, `myFile.txt`), (err, data) => {
	  // do something
	});
	// when I could just do this?
	fs.readFile(`./path/to/myFile.txt`, (err, data) => {
	  // do something
	});

### 3.Logging with colors

- 别忘了console.dir(obj,{colors:true})能够以不同的色彩打印出键与值，这一点会大大增加日志的可读性。

### 4.使用setInterval执行定时任务

	const dailyCleanup = setInterval(() => {
	  cleanup();
	}, 1000 * 60 * 60 * 24);
	dailyCleanup.unref();

### 5.os.EOF

	const fs = require(`fs`);
	// bad
	fs.readFile(`./myFile.txt`, `utf8`, (err, data) => {
	  data.split(`\r\n`).forEach(line => {
	    // do something
	  });
	});
	// good
	const os = require(`os`);
	fs.readFile(`./myFile.txt`, `utf8`, (err, data) => {
	  data.split(os.EOL).forEach(line => {
	    // do something
	  });
	});
	
### 5.HTTP 状态码

	node> http.STATUS_CODES
	
	
### 6.http

- 1.http.get(url,function(ress){});

		http.get(url,function(ress){
			var t='';
		  ress.on('data',function(data) {
		  	t+=data;
		    res.write(t);
		  });
		  ress.on('end',function(data) {
		    res.end();
		  });
		}).on('error',function(e){
			console.log(e);
		});
	
- 2.http.request(opt,function(res){});

		var postData = querystring.stringify({
		  'msg' : 'Hello World!'
		});
		var opt={
			hostname: 'www.google.com',
		  port: 80,
		  path: '/upload',
		  method: 'POST',
		  headers: {
		    'Content-Type': 'application/x-www-form-urlencoded',
		    'Content-Length': postData.length
		  }
		};
		var req = http.request(options, (res) => {
		  console.log(`STATUS: ${res.statusCode}`);
		  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
		  res.setEncoding('utf8');
		  res.on('data', (chunk) => {
		    console.log(`BODY: ${chunk}`);
		  });
		  res.on('end', () => {
		    console.log('No more data in response.')
		  })
		});
		req.on('error', (e) => {
		  console.log(`problem with request: ${e.message}`);
		});
		// write data to request body
		req.write(postData);
		req.end();
	
- 3.app.post(url,function(req,res,next){});
	
- 4.request.post(url,{json:true,form:params},function(err,response,body){});

### 7.四种常见的post方法

#### （a）www-form-urlencoded

- node.js 下使用Express 如何接收这种提交方式.需要 body-parse 插件支持

#### （b）form-data

- 在node.js 里处理这类表单还需要 中间件 connect-multiparty

#### （c）application/json

- bodyParser 支持此类参数解析. 注意: 在提交之前需要指定http 请求头为 content-type=application/json 

#### （d）text/xml

- 这种请求类型不是特别常见, body-parse默认也不解析这种数据格式.注意:我们还是要使用 body-parse 得到字符串,然后再转化.xml格式请求需要指定 http 请求头 content-type=text/xml.利用req上定义的事件  data 来获取http请求流, end 事件结束请求流的处理.利用 xml2json 把上面得到的请求参数流(我们直接转化为字符串)转化为 json 对象.