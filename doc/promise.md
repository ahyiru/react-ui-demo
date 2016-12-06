# promise([Promise/A+ 规范](http://www.ituring.com.cn/article/66566))

## 1.RxJS(Observable),Cycle.js

## 2.EventEmitter，Promise，Web Worker，Generator，Async/Await。

- V8 已经原生实现了 async/await，Node 和各浏览器引擎的实现也会慢慢跟进，而 babel 早就加入了 async/await。目前客户端还是用 babel 预编译使用比较好，而 Node 需要升级到 v7 版本，并且加入 --harmony-async-await 参数。

## 3.目前主流浏览器的 Javascript 引擎原生实现，主流的 Promise 库（es6-promise，bluebrid）基本都是使用 microtask/Promise Job 的形式将 Promise 放入队列。

## 4.

	new Promise((resolve) => {
	  console.log('a')
	  resolve('b')
	  console.log('c')
	}).then((data) => {
	  console.log(data)
	})