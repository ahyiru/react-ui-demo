# typescript

## 1.ECMAScript 6

### 1.1 Symbol

- ES6引入了一种新的原始数据类型Symbol，表示独一无二的值。它是JavaScript语言的第七种数据类型，前六种是：Undefined、Null、布尔值（Boolean）、字符串（String）、数值（Number）、对象（Object）。

- Symbol值通过Symbol函数生成。这就是说，对象的属性名现在可以有两种类型，一种是原来就有的字符串，另一种就是新增的Symbol类型。凡是属性名属于Symbol类型，就都是独一无二的，可以保证不会与其他属性名产生冲突。

		var s1 = Symbol('foo');
		var s2 = Symbol('bar');
		s1 // Symbol(foo)
		s2 // Symbol(bar)
		s1.toString() // "Symbol(foo)"
		s2.toString() // "Symbol(bar)"

### 1.2 Proxy

- Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。

- Proxy 可以理解成，在目标对象之前架设一层“拦截”，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

	ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。
	
		var proxy = new Proxy(target, handler);
	
	Proxy 对象的所有用法，都是上面这种形式，不同的只是handler参数的写法。其中，new Proxy()表示生成一个Proxy实例，target参数表示所要拦截的目标对象，handler参数也是一个对象，用来定制拦截行为。
		
		下面是另一个拦截读取属性行为的例子。
		
		var proxy = new Proxy({}, {
		  get: function(target, property) {
		    return 35;
		  }
		});
		
		proxy.time // 35
		proxy.name // 35
		proxy.title // 35
	
	Proxy 实例也可以作为其他对象的原型对象。

		var proxy = new Proxy({}, {
		  get: function(target, property) {
		    return 35;
		  }
		});
		let obj = Object.create(proxy);
		obj.time // 35
	
	上面代码中，proxy对象是obj对象的原型，obj对象本身并没有time属性，所以根据原型链，会在proxy对象上读取该属性，导致被拦截。
	
### 1.3 Reflect

- Reflect对象与Proxy对象一样，也是ES6为了操作对象而提供的新API。Reflect对象的设计目的有这样几个。

	- （1） 将Object对象的一些明显属于语言内部的方法（比如Object.defineProperty），放到Reflect对象上。现阶段，某些方法同时在Object和Reflect对象上部署，未来的新方法将只部署在Reflect对象上。

	- （2） 修改某些Object方法的返回结果，让其变得更合理。比如，Object.defineProperty(obj, name, desc)在无法定义属性时，会抛出一个错误，而Reflect.defineProperty(obj, name, desc)则会返回false。

			// 老写法
			try {
			  Object.defineProperty(target, property, attributes);
			  // success
			} catch (e) {
			  // failure
			}
			// 新写法
			if (Reflect.defineProperty(target, property, attributes)) {
			  // success
			} else {
			  // failure
			}

	- （3） 让Object操作都变成函数行为。某些Object操作是命令式，比如name in obj和delete obj[name]，而Reflect.has(obj, name)和Reflect.deleteProperty(obj, name)让它们变成了函数行为。

			// 老写法
			'assign' in Object // true
			// 新写法
			Reflect.has(Object, 'assign') // true
	
	- （4）Reflect对象的方法与Proxy对象的方法一一对应，只要是Proxy对象的方法，就能在Reflect对象上找到对应的方法。这就让Proxy对象可以方便地调用对应的Reflect方法，完成默认行为，作为修改行为的基础。也就是说，不管Proxy怎么修改默认行为，你总可以在Reflect上获取默认行为。

			Proxy(target, {
			  set: function(target, name, value, receiver) {
			    var success = Reflect.set(target,name, value, receiver);
			    if (success) {
			      log('property ' + name + ' on ' + target + ' set to ' + value);
			    }
			    return success;
			  }
			});
			
		上面代码中，Proxy方法拦截target对象的属性赋值行为。它采用Reflect.set方法将值赋值给对象的属性，然后再部署额外的功能。

### 1.4使用 Proxy 实现观察者模式
- 观察者模式（Observer mode）指的是函数自动观察数据对象，一旦对象有变化，函数就会自动执行。

		const person = observable({
		  name: '张三',
		  age: 20
		});
		function print() {
		  console.log(`${person.name}, ${person.age}`)
		}
		observe(print);
		person.name = '李四';
		// 输出
		// 李四, 20
	上面代码中，数据对象person是观察目标，函数print是观察者。一旦数据对象发生变化，print就会自动执行。

	下面，使用 Proxy 写一个观察者模式的最简单实现，即实现observable和observe这两个函数。思路是observable函数返回一个原始对象的 Proxy 代理，拦截赋值操作，触发充当观察者的各个函数。

		const queuedObservers = new Set();
		
		const observe = fn => queuedObservers.add(fn);
		const observable = obj => new Proxy(obj, {set});
		
		function set(target, key, value, receiver) {
		  const result = Reflect.set(target, key, value, receiver);
		  queuedObservers.forEach(observer => observer());
		  return result;
		}
	上面代码中，先定义了一个Set集合，所有观察者函数都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。


### 1.5 Iterator

#### 1.5.1 Iterator（遍历器）的概念

JavaScript原有的表示“集合”的数据结构，主要是数组（Array）和对象（Object），ES6又添加了Map和Set。这样就有了四种数据集合，用户还可以组合使用它们，定义自己的数据结构，比如数组的成员是Map，Map的成员是对象。这样就需要一种统一的接口机制，来处理所有不同的数据结构。
	
遍历器（Iterator）就是这样一种机制。它是一种接口，为各种不同的数据结构提供统一的访问机制。任何数据结构只要部署Iterator接口，就可以完成遍历操作（即依次处理该数据结构的所有成员）。
	
Iterator的作用有三个：一是为各种数据结构，提供一个统一的、简便的访问接口；二是使得数据结构的成员能够按某种次序排列；三是ES6创造了一种新的遍历命令for...of循环，Iterator接口主要供for...of消费。

- 下面是一个模拟next方法返回值的例子。

		var it = makeIterator(['a', 'b']);
		
		it.next() // { value: "a", done: false }
		it.next() // { value: "b", done: false }
		it.next() // { value: undefined, done: true }
		
		function makeIterator(array) {
		  var nextIndex = 0;
		  return {
		    next: function() {
		      return nextIndex < array.length ?
		        {value: array[nextIndex++]} :
		        {done: true};
		    }
		  };
		}

- 如果使用TypeScript的写法，遍历器接口（Iterable）、指针对象（Iterator）和next方法返回值的规格可以描述如下。

		interface Iterable {
		  [Symbol.iterator]() : Iterator,
		}
		
		interface Iterator {
		  next(value?: any) : IterationResult,
		}
		
		interface IterationResult {
		  value: any,
		  done: boolean,
		}

- 在ES6中，有三类数据结构原生具备Iterator接口：数组、某些类似数组的对象、Set和Map结构。
- 一个对象如果要有可被for...of循环调用的Iterator接口，就必须在Symbol.iterator的属性上部署遍历器生成方法（原型链上的对象具有该方法也可）。

		class RangeIterator {
		  constructor(start, stop) {
		    this.value = start;
		    this.stop = stop;
		  }
		
		  [Symbol.iterator]() { return this; }
		
		  next() {
		    var value = this.value;
		    if (value < this.stop) {
		      this.value++;
		      return {done: false, value: value};
		    } else {
		      return {done: true, value: undefined};
		    }
		  }
		}
		
		function range(start, stop) {
		  return new RangeIterator(start, stop);
		}
		
		for (var value of range(0, 3)) {
		  console.log(value);
		}
	上面代码是一个类部署Iterator接口的写法。Symbol.iterator属性对应一个函数，执行后返回当前对象的遍历器对象。

#### 1.5.2 调用Iterator接口的场合

- （1）解构赋值

对数组和Set结构进行解构赋值时，会默认调用Symbol.iterator方法。

	let set = new Set().add('a').add('b').add('c');
	let [x,y] = set;
	// x='a'; y='b'
	let [first, ...rest] = set;
	// first='a'; rest=['b','c'];

- （2）yield*

yield*后面跟的是一个可遍历的结构，它会调用该结构的遍历器接口。

	let generator = function* () {
	  yield 1;
	  yield* [2,3,4];
	  yield 5;
	};
	var iterator = generator();
	iterator.next() // { value: 1, done: false }
	iterator.next() // { value: 2, done: false }
	iterator.next() // { value: 3, done: false }
	iterator.next() // { value: 4, done: false }
	iterator.next() // { value: 5, done: false }
	iterator.next() // { value: undefined, done: true }

- （3）其他场合

由于数组的遍历会调用遍历器接口，所以任何接受数组作为参数的场合，其实都调用了遍历器接口。下面是一些例子。

	for...of
	Array.from()
	Map(), Set(), WeakMap(), WeakSet()（比如new Map([['a',1],['b',2]])）
	Promise.all()
	Promise.race()

### 1.6 Generator

Generator函数是ES6提供的一种异步编程解决方案，语法行为与传统函数完全不同。

Generator函数有多种理解角度。从语法上，首先可以把它理解成，Generator函数是一个状态机，封装了多个内部状态。

执行Generator函数会返回一个遍历器对象，也就是说，Generator函数除了状态机，还是一个遍历器对象生成函数。返回的遍历器对象，可以依次遍历Generator函数内部的每一个状态。

形式上，Generator函数是一个普通函数，但是有两个特征。一是，function关键字与函数名之间有一个星号；二是，函数体内部使用yield语句，定义不同的内部状态（yield语句在英语里的意思就是“产出”）。

ES6没有规定，function关键字与函数名之间的星号，写在哪个位置。这导致下面的写法都能通过。

	function * foo(x, y) { ··· }
	
	function *foo(x, y) { ··· }
	
	function* foo(x, y) { ··· }
	
	function*foo(x, y) { ··· }
	
由于Generator函数仍然是普通函数，所以一般的写法是上面的第三种，即星号紧跟在function关键字后面。本书也采用这种写法。

### 1.6.1 yield语句

由于Generator函数返回的遍历器对象，只有调用next方法才会遍历下一个内部状态，所以其实提供了一种可以暂停执行的函数。yield语句就是暂停标志。

遍历器对象的next方法的运行逻辑如下。

（1）遇到yield语句，就暂停执行后面的操作，并将紧跟在yield后面的那个表达式的值，作为返回的对象的value属性值。

（2）下一次调用next方法时，再继续往下执行，直到遇到下一个yield语句。

（3）如果没有再遇到新的yield语句，就一直运行到函数结束，直到return语句为止，并将return语句后面的表达式的值，作为返回的对象的value属性值。

（4）如果该函数没有return语句，则返回的对象的value属性值为undefined。

需要注意的是，yield语句后面的表达式，只有当调用next方法、内部指针指向该语句时才会执行，因此等于为JavaScript提供了手动的“惰性求值”（Lazy Evaluation）的语法功能。

	function* gen() {
	  yield  123 + 456;
	}
上面代码中，yield后面的表达式123 + 456，不会立即求值，只会在next方法将指针移到这一句时，才会求值。

- 调用另一个Generator函数，需要用到yield*语句，用来在一个Generator函数里面执行另一个Generator函数。

		function* bar() {
		  yield 'x';
		  yield* foo();
		  yield 'y';
		}
		
		// 等同于
		function* bar() {
		  yield 'x';
		  yield 'a';
		  yield 'b';
		  yield 'y';
		}
		
		// 等同于
		function* bar() {
		  yield 'x';
		  for (let v of foo()) {
		    yield v;
		  }
		  yield 'y';
		}
		
		for (let v of bar()){
		  console.log(v);
		}
		// "x"
		// "a"
		// "b"
		// "y"

- 作为对象属性的Generator函数

	如果一个对象的属性是Generator函数，可以简写成下面的形式。

		let obj = {
		  * myGeneratorMethod() {
		    ···
		  }
		};
	上面代码中，myGeneratorMethod属性前面有一个星号，表示这个属性是一个Generator函数。

	它的完整形式如下，与上面的写法是等价的。

		let obj = {
		  myGeneratorMethod: function* () {
		    // ···
		  }
		};

#### 1.6.2 Generator与状态机

	Generator是实现状态机的最佳结构。比如，下面的clock函数就是一个状态机。

		var ticking = true;
		var clock = function() {
		  if (ticking)
		    console.log('Tick!');
		  else
		    console.log('Tock!');
		  ticking = !ticking;
		}
	上面代码的clock函数一共有两种状态（Tick和Tock），每运行一次，就改变一次状态。这个函数如果用Generator实现，就是下面这样。

		var clock = function*() {
		  while (true) {
		    console.log('Tick!');
		    yield;
		    console.log('Tock!');
		    yield;
		  }
		};
	上面的Generator实现与ES5实现对比，可以看到少了用来保存状态的外部变量ticking，这样就更简洁，更安全（状态不会被非法篡改）、更符合函数式编程的思想，在写法上也更优雅。Generator之所以可以不用外部变量保存状态，是因为它本身就包含了一个状态信息，即目前是否处于暂停态。

#### 1.6.3 Generator应用

- （1）异步操作的同步化表达
	Generator函数的暂停执行的效果，意味着可以把异步操作写在yield语句里面，等到调用next方法时再往后执行。这实际上等同于不需要写回调函数了，因为异步操作的后续操作可以放在yield语句下面，反正要等到调用next方法时再执行。所以，Generator函数的一个重要实际意义就是用来处理异步操作，改写回调函数。

		function* loadUI() {
		  showLoadingScreen();
		  yield loadUIDataAsynchronously();
		  hideLoadingScreen();
		}
		var loader = loadUI();
		// 加载UI
		loader.next()
		// 卸载UI
		loader.next()

	Ajax是典型的异步操作，通过Generator函数部署Ajax操作，可以用同步的方式表达。

		function* main() {
		  var result = yield request("http://some.url");
		  var resp = JSON.parse(result);
		    console.log(resp.value);
		}
		function request(url) {
		  makeAjaxCall(url, function(response){
		    it.next(response);
		  });
		}
		var it = main();
		it.next();

- （2）控制流管理
	如果有一个多步操作非常耗时，采用回调函数，可能会写成下面这样。

		step1(function (value1) {
		  step2(value1, function(value2) {
		    step3(value2, function(value3) {
		      step4(value3, function(value4) {
		        // Do something with value4
		      });
		    });
		  });
		});
	采用Promise改写上面的代码。

		Promise.resolve(step1)
		  .then(step2)
		  .then(step3)
		  .then(step4)
		  .then(function (value4) {
		    // Do something with value4
		  }, function (error) {
		    // Handle any error from step1 through step4
		  })
		  .done();
	上面代码已经把回调函数，改成了直线执行的形式，但是加入了大量Promise的语法。Generator函数可以进一步改善代码运行流程。

		function* longRunningTask(value1) {
		  try {
		    var value2 = yield step1(value1);
		    var value3 = yield step2(value2);
		    var value4 = yield step3(value3);
		    var value5 = yield step4(value4);
		    // Do something with value4
		  } catch (e) {
		    // Handle any error from step1 through step4
		  }
		}
	然后，使用一个函数，按次序自动执行所有步骤。
	
		scheduler(longRunningTask(initialValue));
		function scheduler(task) {
		  var taskObj = task.next(task.value);
		  // 如果Generator函数未结束，就继续调用
		  if (!taskObj.done) {
		    task.value = taskObj.value
		    scheduler(task);
		  }
		}
	
	利用for...of循环会自动依次执行yield命令的特性，提供一种更一般的控制流管理的方法。

		let steps = [step1Func, step2Func, step3Func];
		function *iterateSteps(steps){
		  for (var i=0; i< steps.length; i++){
		    var step = steps[i];
		    yield step();
		  }
		}
	上面代码中，数组steps封装了一个任务的多个步骤，Generator函数iterateSteps则是依次为这些步骤加上yield命令。

	将任务分解成步骤之后，还可以将项目分解成多个依次执行的任务。

		let jobs = [job1, job2, job3];
		function *iterateJobs(jobs){
		  for (var i=0; i< jobs.length; i++){
		    var job = jobs[i];
		    yield *iterateSteps(job.steps);
		  }
		}
	上面代码中，数组jobs封装了一个项目的多个任务，Generator函数iterateJobs则是依次为这些任务加上yield *命令。

	最后，就可以用for...of循环一次性依次执行所有任务的所有步骤。

		for (var step of iterateJobs(jobs)){
		  console.log(step.id);
		}

	for...of的本质是一个while循环，所以上面的代码实质上执行的是下面的逻辑。

		var it = iterateJobs(jobs);
		var res = it.next();
		while (!res.done){
		  var result = res.value;
		  // ...
		  res = it.next();
		}

- （3）部署Iterator接口

	利用Generator函数，可以在任意对象上部署Iterator接口。

		function* iterEntries(obj) {
		  let keys = Object.keys(obj);
		  for (let i=0; i < keys.length; i++) {
		    let key = keys[i];
		    yield [key, obj[key]];
		  }
		}
		let myObj = { foo: 3, bar: 7 };
		for (let [key, value] of iterEntries(myObj)) {
		  console.log(key, value);
		}
		// foo 3
		// bar 7

- （4）作为数据结构
	Generator可以看作是数据结构，更确切地说，可以看作是一个数组结构，因为Generator函数可以返回一系列的值，这意味着它可以对任意表达式，提供类似数组的接口。
	
		function *doStuff() {
		  yield fs.readFile.bind(null, 'hello.txt');
		  yield fs.readFile.bind(null, 'world.txt');
		  yield fs.readFile.bind(null, 'and-such.txt');
		}
	上面代码就是依次返回三个函数，但是由于使用了Generator函数，导致可以像处理数组那样，处理这三个返回的函数。
	
		for (task of doStuff()) {
		  // task是一个函数，可以像回调函数那样使用它
		}
	实际上，如果用ES5表达，完全可以用数组模拟Generator的这种用法。
	
		function doStuff() {
		  return [
		    fs.readFile.bind(null, 'hello.txt'),
		    fs.readFile.bind(null, 'world.txt'),
		    fs.readFile.bind(null, 'and-such.txt')
		  ];
		}
	上面的函数，可以用一模一样的for...of循环处理！两相一比较，就不难看出Generator使得数据或者操作，具备了类似数组的接口。

### 1.7 Decorator

#### 1.7.1 类的修饰
修饰器（Decorator）是一个函数，用来修改类的行为。这是ES7的一个提案，目前Babel转码器已经支持。

修饰器对类的行为的改变，是代码编译时发生的，而不是在运行时。这意味着，修饰器能在编译阶段运行代码。

	function testable(target) {
	  target.isTestable = true;
	}
	@testable
	class MyTestableClass {}
	console.log(MyTestableClass.isTestable) // true
上面代码中，@testable就是一个修饰器。它修改了MyTestableClass这个类的行为，为它加上了静态属性isTestable。

基本上，修饰器的行为就是下面这样。

	@decorator
	class A {}
	
	// 等同于
	
	class A {}
	A = decorator(A) || A;
也就是说，修饰器本质就是编译时执行的函数。

修饰器函数的第一个参数，就是所要修饰的目标类。

#### 1.7.2 方法的修饰
修饰器不仅可以修饰类，还可以修饰类的属性。

	class Person {
	  @readonly
	  name() { return `${this.first} ${this.last}` }
	}
上面代码中，修饰器readonly用来修饰“类”的name方法。

此时，修饰器函数一共可以接受三个参数，第一个参数是所要修饰的目标对象，第二个参数是所要修饰的属性名，第三个参数是该属性的描述对象。

	function readonly(target, name, descriptor){
	  // descriptor对象原来的值如下
	  // {
	  //   value: specifiedFunction,
	  //   enumerable: false,
	  //   configurable: true,
	  //   writable: true
	  // };
	  descriptor.writable = false;
	  return descriptor;
	}
	readonly(Person.prototype, 'name', descriptor);
	// 类似于
	Object.defineProperty(Person.prototype, 'name', descriptor);
上面代码说明，修饰器（readonly）会修改属性的描述对象（descriptor），然后被修改的描述对象再用来定义属性。

- 下面的@log修饰器，可以起到输出日志的作用。

		class Math {
		  @log
		  add(a, b) {
		    return a + b;
		  }
		}
		function log(target, name, descriptor) {
		  var oldValue = descriptor.value;
		  descriptor.value = function() {
		    console.log(`Calling "${name}" with`, arguments);
		    return oldValue.apply(null, arguments);
		  };
		  return descriptor;
		}
		const math = new Math();
		// passed parameters should get logged now
		math.add(2, 4);
上面代码中，@log修饰器的作用就是在执行原始的操作之前，执行一次console.log，从而达到输出日志的目的。

- 由于存在函数提升，使得修饰器不能用于函数。类是不会提升的，所以就没有这方面的问题。

#### 1.7.3 Mixin
在修饰器的基础上，可以实现Mixin模式。所谓Mixin模式，就是对象继承的一种替代方案，中文译为“混入”（mix in），意为在一个对象之中混入另外一个对象的方法。

请看下面的例子。

	const Foo = {
	  foo() { console.log('foo') }
	};
	class MyClass {}
	Object.assign(MyClass.prototype, Foo);
	let obj = new MyClass();
	obj.foo() // 'foo'
上面代码之中，对象Foo有一个foo方法，通过Object.assign方法，可以将foo方法“混入”MyClass类，导致MyClass的实例obj对象都具有foo方法。这就是“混入”模式的一个简单实现。

下面，我们部署一个通用脚本mixins.js，将mixin写成一个修饰器。

	export function mixins(...list) {
	  return function (target) {
	    Object.assign(target.prototype, ...list);
	  };
	}
然后，就可以使用上面这个修饰器，为类“混入”各种方法。

	import { mixins } from './mixins';
	const Foo = {
	  foo() { console.log('foo') }
	};
	@mixins(Foo)
	class MyClass {}
	let obj = new MyClass();
	obj.foo() // "foo"
通过mixins这个修饰器，实现了在MyClass类上面“混入”Foo对象的foo方法。

#### 1.7.4 Trait
Trait也是一种修饰器，效果与Mixin类似，但是提供更多功能，比如防止同名方法的冲突、排除混入某些方法、为混入的方法起别名等等。

- 下面采用traits-decorator这个第三方模块作为例子。这个模块提供的traits修饰器，不仅可以接受对象，还可以接受ES6类作为参数。

		import { traits } from 'traits-decorator';
		class TFoo {
		  foo() { console.log('foo') }
		}
		const TBar = {
		  bar() { console.log('bar') }
		};
		@traits(TFoo, TBar)
		class MyClass { }
		let obj = new MyClass();
		obj.foo() // foo
		obj.bar() // bar
上面代码中，通过traits修饰器，在MyClass类上面“混入”了TFoo类的foo方法和TBar对象的bar方法。

- Trait不允许“混入”同名方法。

		import { traits } from 'traits-decorator';
		class TFoo {
		  foo() { console.log('foo') }
		}
		const TBar = {
		  bar() { console.log('bar') },
		  foo() { console.log('foo') }
		};
		@traits(TFoo, TBar)
		class MyClass { }
		// 报错
		// throw new Error('Method named: ' + methodName + ' is defined twice.');
		//        ^
		// Error: Method named: foo is defined twice.

- 一种解决方法是排除TBar的foo方法。

		import { traits, excludes } from 'traits-decorator';
		class TFoo {
		  foo() { console.log('foo') }
		}
		const TBar = {
		  bar() { console.log('bar') },
		  foo() { console.log('foo') }
		};
		@traits(TFoo, TBar::excludes('foo'))
		class MyClass { }
		let obj = new MyClass();
		obj.foo() // foo
		obj.bar() // bar
	上面代码使用绑定运算符（::）在TBar上排除foo方法，混入时就不会报错了。

- 另一种方法是为TBar的foo方法起一个别名。

		import { traits, alias } from 'traits-decorator';
		class TFoo {
		  foo() { console.log('foo') }
		}
		const TBar = {
		  bar() { console.log('bar') },
		  foo() { console.log('foo') }
		};
		@traits(TFoo, TBar::alias({foo: 'aliasFoo'}))
		class MyClass { }
		let obj = new MyClass();
		obj.foo() // foo
		obj.aliasFoo() // foo
		obj.bar() // bar
	上面代码为TBar的foo方法起了别名aliasFoo，于是MyClass也可以混入TBar的foo方法了。

	alias和excludes方法，可以结合起来使用。

		@traits(TExample::excludes('foo','bar')::alias({baz:'exampleBaz'}))
		class MyClass {}

#### 1.7.5 Babel转码器的支持
目前，Babel转码器已经支持Decorator。

首先，安装babel-core和babel-plugin-transform-decorators。由于后者包括在babel-preset-stage-0之中，所以改为安装babel-preset-stage-0亦可。

	$ npm install babel-core babel-plugin-transform-decorators
然后，设置配置文件.babelrc。

	{
	  "plugins": ["transform-decorators"]
	}
这时，Babel就可以对Decorator转码了。

脚本中打开的命令如下。

	babel.transform("code", {plugins: ["transform-decorators"]})


### 1.8 Set和Map数据结构

#### 1.8.1 Set
- ES6提供了新的数据结构Set。它类似于数组，但是成员的值都是唯一的，没有重复的值。

		var set = new Set([1, 2, 3, 4, 4]);
		[...set] // [1, 2, 3, 4]
		var items = new Set([1, 2, 3, 4, 5, 5, 5, 5]);
		items.size // 5

- 数组去重

		// 去除数组的重复成员
		[...new Set(array)]

Array.from方法可以将Set结构转为数组。

	var items = new Set([1, 2, 3, 4, 5]);
	var array = Array.from(items);
这就提供了去除数组重复成员的另一种方法。
		function dedupe(array) {
		  return Array.from(new Set(array));
		}
		dedupe([1, 1, 2, 3]) // [1, 2, 3]

#### 1.8.2 WeakSet
WeakSet结构与Set类似，也是不重复的值的集合。但是，它与Set有两个区别。

首先，WeakSet的成员只能是对象，而不能是其他类型的值。

其次，WeakSet中的对象都是弱引用，即垃圾回收机制不考虑WeakSet对该对象的引用，也就是说，如果其他对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。这个特点意味着，无法引用WeakSet的成员，因此WeakSet是不可遍历的。

#### 1.8.3 Map
Object结构提供了“字符串—值”的对应，Map结构提供了“值—值”的对应，是一种更完善的Hash结构实现。如果你需要“键值对”的数据结构，Map比Object更合适。

	var m = new Map([
	  [true, 'foo'],
	  ['true', 'bar']
	]);
	m.get(true) // 'foo'
	m.get('true') // 'bar'
	var map = new Map();
	map.set(['a'], 555);
	map.get(['a']) // undefined
	var map = new Map();
	var k1 = ['a'];
	var k2 = ['a'];
	map
	.set(k1, 111)
	.set(k2, 222);
	map.get(k1) // 111
	map.get(k2) // 222
Map的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键。这就解决了同名属性碰撞（clash）的问题，我们扩展别人的库的时候，如果使用对象作为键名，就不用担心自己的属性与原作者的属性同名。

delete方法删除某个键，返回true。如果删除失败，返回false。
clear方法清除所有成员，没有返回值。


#### 1.8.4 WeakMap
WeakMap结构与Map结构基本类似，唯一的区别是它只接受对象作为键名（null除外），不接受其他类型的值作为键名，而且键名所指向的对象，不计入垃圾回收机制。










