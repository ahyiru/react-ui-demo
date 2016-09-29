/*localStorage.setItem('test', 'hhhh');
localStorage.getItem('test');
localStorage.removeItem('test');
localStorage.clear();//remove all
test=JSON.stringify(students);//将JSON对象转化成字符串，然后setItem
test=JSON.parse(students);//getItem 后，把字符串转换成JSON对象
*/

import {addClass} from '../configs/tools';

if(navigator.cookieEnabled){
	let theme=localStorage.getItem('theme')||'';
	addClass(document.body,theme);
}
else{
	console.log('你处于隐私模式!');
}


