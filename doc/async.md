## 回调函数 async/await <-- generator/yield <-- promise <-- ajax

### 直接上例子，比如我们需要按顺序获取：产品数据=>用户数据=>评论数据

### ajax

	// 获取产品数据
	ajax('products.json', (products) => {
	    console.log('AJAX/products >>>', JSON.parse(products));
	
	    // 获取用户数据
	    ajax('users.json', (users) => {
	        console.log('AJAX/users >>>', JSON.parse(users));
	
	        // 获取评论数据
	        ajax('products.json', (comments) => {
	            console.log('AJAX/comments >>>', JSON.parse(comments));
	        });
	    });
	});

### Promise

	// Promise
	// 封装 Ajax，返回一个 Promise
	function requestP(url) {
	    return new Promise(function(resolve, reject) {
	        ajax(url, (response) => {
	            resolve(JSON.parse(response));
	        });
	    });
	}
	
	// 获取产品数据
	requestP('products.json').then(function(products){
	    console.log('Promises/products >>>', products);
	});
	
	// 获取用户数据
	requestP('users.json').then(function(users){
	    console.log('Promises/users >>>', users);
	});
	
	// 获取评论数据
	requestP('comments.json').then(function(comments){
	    console.log('Promises/comments >>>', comments);
	});
	
当然使用 Promise.all 可以更简洁

	Promise.all([
    requestP('products.json'),
    requestP('users.json'),
    requestP('comments.json')
	])
	.then(function(data) {
	    console.log('Parallel promises >>>', data);
	});
	
### Generators

	// Generators
	function request(url) {
	    ajax(url, (response) => {
	        iterator.next(JSON.parse(response));
	    });
	}
	
	function *main() {
	    // 获取产品数据
	    let data = yield request('products.json');
	
	    // 获取用户数据
	    let users = yield request('users.json');
	
	    // 获取评论数据
	    let products = yield request('comments.json');
	
	    console.log('Generator/products >>>', products);
	    console.log('Generator/users >>>', users);
	    console.log('Generator/comments >>>', comments);
	}
	
	var iterator = main();
	iterator.next();
	
### await/async

与 Promise 结合使用

	// 封装 Ajax，返回一个 Promise
	function requestP(url) {
	    return new Promise(function(resolve, reject) {
	        ajax(url, (response) => {
	            resolve(JSON.parse(response));
	        });
	    });
	}
	
	(async () => {
	    // 获取产品数据
	    let data = await requestP('products.json');
	
	     // 获取用户数据
	    let users = await requestP('users.json');
	
	     // 获取评论数据
	    let products = await requestP('comments.json');
	
	    console.log('ES7 Async/products >>>', products);
	    console.log('ES7 Async/users >>>', users);
	    console.log('ES7 Async/comments >>>', comments);
	}());
	
与 Fetch API 结合使用：

	(async () => {
	// Async/await using the fetch API
	    try {
	
	         // 获取产品数据
	        let products = await fetch('products.json');
	
	        // Parsing products
	        let parsedProducts = await products.json();
	
	        // 获取用户数据
	        let users = await fetch('users.json');
	
	        // Parsing users
	        let parsedUsers = await users.json();
	
	        // 获取评论数据
	        let comments = await fetch('comments.json');
	
	        // Parsing comments
	        let parsedComments = await comments.json();
	
	
	        console.log('ES7 Async+fetch/products >>>', parsedProducts);
	        console.log('ES7 Async+fetch/users >>>', parsedUsers);
	        console.log('ES7 Async+fetch/comments >>>', parsedComments);
	
	
	    } catch (error) {
	        console.log(error);
	    }
	}());
	
按数组顺序执行

	 (async () => {
	    let parallelData = await* [
	        requestP('products.json'),
	        requestP('users.json'),
	        requestP('comments.json')
	    ];
	    console.log('Async parallel >>>', parallelData);
	}());
	
再次结合 Fetch

	(async () => {
	    let parallelDataFetch = await* [
	        (await fetch('products.json')).json(),
	        (await fetch('users.json')).json(),
	        (await fetch('comments.json')).json()
	    ];
	    console.log('Async parallel+fetch >>>', parallelDataFetch);
	}());