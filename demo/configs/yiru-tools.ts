//事件监听
export const $emitter={
  _events:{},
  dispatch:function(event,data){
    if(!this._events[event]){
      return; //没有监听事件
    }
    for(let i=0;i<this._events[event].length;i++){
      this._events[event][i](data);
    }
  },
  subscribe:function(event,callback){
    if(!this._events[event]){
      this._events[event]=[]; //创建新事件数组
    }
    this._events[event].push(callback);
  },
  unSubscribe:function(event){
    if(this._events&&this._events[event]){
      delete this._events[event]; //事件解绑
    }
  }
};

//数组、对象拷贝clone
export const $clone=(obj):any=>{
  let str='',newobj=obj.constructor===Array?[]:{};
  if(typeof obj!=='object'){
    return;
  }/*else if(window.JSON){//浏览器支持json解析
    str=JSON.stringify(obj);
    newobj=JSON.pares(str);
  }*/else{
    for(let i in obj){
      newobj[i]=typeof obj[i]==='object'?$clone(obj[i]):obj[i];
    }
  }
  return newobj;
};

//对象合并merge
export const $merge=(base,extend):any=>{
  if(typeof base!=='object'){
    return extend;
  }
  if(base instanceof Array && extend instanceof Array){
    return base.concat(extend);
  }
  for(let k in extend){
    if(typeof base[k]==='object'&&typeof extend[k]==='object'){
      base[k]=$merge(base[k],extend[k]);
    }else{
      base[k]=extend[k];
    }
  }
  return base;
};

//对象重置reset
export const resetObj=(obj)=>{
  let keys=Object.keys(obj);
  for(let i=0,j=keys.length;i<j;i++){
    obj[keys[i]]='';
  }
  return obj;
};

//数组去重
export const $unique=(arr)=>{
  let result=[];
  for(let i=0,l=arr.length;i<l;i++){
    if(result.indexOf(arr[i])===-1){
      result.push(arr[i]);
    }
  }
  return result;
};

//排序
export const $sort=(param1,param2)=>{
  //如果两个参数均为字符串类型
  if(typeof param1=='string'&&typeof param2=='string'){
    return param1.toLowerCase().localeCompare(param2.toLowerCase());
  }
  //如果参数1为数字，参数2为字符串
  if(typeof param1=='number'&&typeof param2=='string'){
    return -1;
  }
  //如果参数1为字符串，参数2为数字
  if(typeof param1=='string'&&typeof param2=='number'){
    return 1;
  }
  //如果两个参数均为数字
  if(typeof param1=='number'&&typeof param2=='number'){
    return param1-param2;
  }
};

//服务请求fetch管理
export const $ajax=(opt)=>{
  opt=opt||{};
  opt.method=opt.method||'GET';
  opt.url=opt.url||'';
  opt.data=opt.data||null;
  opt.async=opt.ansync||true;
  opt.dataType=opt.dataType||'text';
  opt.contentType=opt.contentType||'application/x-www-form-urlencoded';
  opt.beforeSend=opt.beforeSend||function(){};
  opt.success=opt.success||function(){};
  opt.error=opt.error||function(){};
  opt.beforeSend();

  let xhr=null;
  XMLHttpRequest?(xhr=new XMLHttpRequest()):(xhr=new ActiveXObject('Microsoft.XMLHTTP'));

  if(opt.method.toUpperCase()==='GET'){
    xhr.open(opt.method,opt.url,opt.async);
    xhr.send(null);
  }else if(opt.method.toUpperCase()==='POST'){
    xhr.open(opt.method,opt.url,opt.async);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
    xhr.send(opt.data);
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if(xhr.status>=200&&xhr.status<300||xhr.status==304){
        if(opt.success){
          opt.success(xhr.responseText);
        }
      }else{
         if(opt.error){
           opt.error(xhr.status);
         }
      }
    }
  };
};
//fetch
require('es6-promise').polyfill();
const fetch=require('isomorphic-fetch');
export const $fetch={
  get:(url,headers,cors)=>{
    return fetch(url,{
      method:'GET',
      cors:cors||'no-cors',
      headers:headers||{'Content-Type':'application/json'},
    }).then(response => response.json())
    /*.then((data)=>{
      return data;
    })
    .catch((err)=>{
      return err;
    });*/
  },
  post:(url,data,headers,cors)=>{
    return fetch(url,{
      method:'POST',
      body:JSON.stringify(data),
      cors:cors||'no-cors',
      headers:headers||{'Content-Type':'application/json'},
    }).then(response => response.json())
    /*.then((data)=>{
      return data;
    })
    .catch((err)=>{
      return err;
    });*/
  },
  put:(url,headers,cors)=>{
    return fetch(url,{
      method:'PUT',
      cors:cors||'no-cors',
      headers:headers||{'Content-Type':'application/json'},
    }).then(response => response.json())
    /*.then((data)=>{
      return data;
    })
    .catch((err)=>{
      return err;
    });*/
  },
};

//验证器
export const $validate={
  verify:{
    successInfo:'验证成功!',
    required:[
      /[\S]+/,
      '必填项不能为空',
    ],
    phone:[
      /^1\d{10}$/,
      '请输入正确的手机号',
    ],
    email:[
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/,
      '邮箱格式不正确',
    ],
    pwd:[
      //必须包含大小写字母和数字的组合，不能使用特殊字符，长度在8-10之间!
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,10}$$/,
      '密码式不正确',
    ],
    yemail:[
      /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/,
      '邮箱格式不正确',
    ],
    ypwd:[
      //密码长度为8-20个字符，并且至少包含数字、大小写字母中的两种，不含特殊字符！
      /^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{8,20}$/,
      '密码式不正确',
    ],
    name:[
      /^[a-zA-Z_]\w{4,15}$/,
      '用户名格式不正确',
    ],
    url:[
      /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/,
      '链接格式不正确',
    ],
    number:[
      /^\d+$/,
      '只能填写数字',
    ],
    hanzi:[
      /^[\u4e00-\u9fa5]$/,
      '只能填写汉字',
    ],
    date:[
      /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/,
      '日期格式不正确',
    ],
    identity:[
      /(^\d{15}$)|(^\d{17}(x|X|\d)$)/,
      '请输入正确的身份证号',
    ],
  },
  isRequired:(val)=>{
    if(this.verify.required[0].test(val)){
      return {ok:true,info:'验证成功!'};
    }else{
      return {ok:false,info:this.verify.required[1]};
    }
  },
  chkPhone:(val)=>{
    if(this.verify.phone[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.phone[1]};
    }
  },
  chkEmail:(val)=>{
    if(this.verify.email[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.email[1]};
    }
  },
  chkPwd:(val)=>{
    if(this.verify.pwd[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.pwd[1]};
    }
  },
  chkName:(val)=>{
    if(this.verify.name[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.name[1]};
    }
  },
  chkUrl:(val)=>{
    if(this.verify.url[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.url[1]};
    }
  },
  chkNumber:(val)=>{
    if(this.verify.number[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.number[1]};
    }
  },
  chkHanzi:(val)=>{
    if(this.verify.hanzi[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.hanzi[1]};
    }
  },
  chkDate:(val)=>{
    if(this.verify.date[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.date[1]};
    }
  },
  chkIdentity:(val)=>{
    if(this.verify.identity[0].test(val)){
      return {ok:true,info:this.verify.successInfo};
    }else{
      return {ok:false,info:this.verify.identity[1]};
    }
  },
};

//缓存操作
export const $storage={
  get:(name)=>{
    let data=null;
    try{
      data=JSON.parse(localStorage.getItem(name));
    }catch(err){
      data=localStorage.getItem(name);
    }
    return data;
  },
  set:(name,data)=>{
    if(typeof data==='object') data=JSON.stringify(data);
    localStorage.setItem(name,data);
  },
  rm:(name)=>{
    localStorage.removeItem(name);
  },
  clear:()=>{
    localStorage.clear();
  },
};

//事件管理
export const $event={
  add:(element,type,handler)=>{
    element.addEventListener(type,handler,false);
  },
  remove:(element,type,handler)=>{
    element.removeEventListener(type,handler,false);
  },
};

//异步管理
export const $promise=()=>{
  let prom=new Promise((resolve,reject)=>{
    if(1){
      resolve('args');
    }else{
      reject('error');
    }
  });
  prom.then((data)=>{
    console.log(data);
  }).catch((error)=>{
    console.log(error);
  });
};


//window event
//click,scroll,resize,drag...




//状态管理
//mobx



//路由切换管理
//hashchange




//生命周期管理




//拦截器




//nodejs框架 koa2




//其他other





//在min和max间生成随机数
//let x=~~(Math.random()*(max-min+1))+min;
export const $rand=(a,b)=>{
  a<b&&(a=[b,b=a][0]);
  return ~~(Math.random()*(a-b+1))+b;
};
  
//生成一个随机的数字字母字符串
//let r=Math.random().toString(36).substring(2,10);//8位
export const $randstr=(n)=>{
  return Math.random().toString(36).slice(2,n+2);
};
  
//随机颜色
// '#'+(~~(Math.random()*0xFFFFFF)).toString(16);
// '#'+(~~(Math.random()*(1<<24))).toString(16);
export const $randcolor=()=>{
  return '#'+(~~(Math.random()*(1<<24))).toString(16);
};


//去掉字符串空格
// String.prototype.trim=function(){
//   return this.replace(/^\s+|\s+$/g,'');
// };
export const $trim=(str)=>{
  return str.replace(/^\s+|\s+$/g,'');
};















