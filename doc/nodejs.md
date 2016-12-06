# nodejs

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