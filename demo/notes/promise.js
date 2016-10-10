/*
1、Promise构造方法接受一个方法作为参数，该方法传入两个参数，resolve和reject。
2、resolve用来将Promise对象的状态置为成功，并将异步操作结果value作为参数传给成功回调函数。
3、reject用来将Promise对象的状态置为失败，并将异步操作错误error作为参数传给失败回调函数。
4、then方法绑定两个回调函数，第一个用来处理Promise成功状态，第二个用来处理Promise失败状态。

Promise对象有三种状态：
  Pending（进行中）
  Fulfilled（已完成，又称为Resolved）
  Rejectd（已失败）

1、对象状态只由异步操作结果决定。resolve方法会使Promise对象由pendding状态变为fulfilled状态；reject方法或者异常会使得Promise对象由pendding状态变为rejected状态。Promise状态变化只有上图这两条路径。
2、对象状态一旦改变，任何时候都能得到这个结果。即状态一旦进入fulfilled或者rejected，promise便不再出现状态变化，同时我们再添加回调会立即得到结果。这点跟事件不一样，事件是发生后再绑定监听，就监听不到了。

 */
let promise = new Promise(function(resolve, reject) {
    // ... some code
    if ( /* 异步操作成功 */ ) {
        resolve(value);
    } else {
        reject(error);
    }
});

// good
promise
  .then(function(data) { //cb
    // success
  })
  .catch(function(err) {
    // error
  });
// bad
promise.then(function(value) {
    // success 
}, function(error) {
    // failure 
});


var d = new Date();
var promise = new Promise(function(resolve, reject) {
    // 一秒后进入resolve，并传递值
    setTimeout(resolve, 1000, 'resolve from promise');
});
// 绑定回调函数
promise.then(
    result => console.log('result:', result, new Date() - d),
    error => console.log('error:', error)
)
// result: resolve from promise 1002


// 下面两种写法是等价的
somePromise.catch(function(err) {
    //...
})
somePromise.then(null, function(err) {
    //...
})

// load image
function loadImageAsync(url) {
  return new Promise(function(resolve, reject) {
    var image = new Image();
    image.onload = function() {
      resolve(image);
    };
    image.onerror = function() {
      reject(new Error('Could not load image at ' + url));
    };
    image.src = url;
  });
}


/**********************************************************/

let promise = new Promise((resolve, reject)=> {
    // ... some code
    if ( /* 异步操作成功 */ ) {
        resolve(value);
    } else {
        reject(error);
    }
});

// good
promise
  .then((data)=> { //cb
    // success
  })
  .catch((err)=> {
    // error
  });













