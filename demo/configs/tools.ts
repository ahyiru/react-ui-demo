
export const hasClass=(target,cname)=>{
  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
};
export const addClass=(target,cname)=>{
  var nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&!hasClass(target,v)){
      target.className+=' '+v;
    }
  });
};
export const removeClass=(target,cname)=>{
  var nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&hasClass(target,v)){
      // var reg=new RegExp('(\\s|^)'+v+'(\\s|$)');
      var reg=new RegExp('(\\s|^)'+v);
      target.className=target.className.replace(reg,'');
    }
  });
};
export const toggleClass=(target,cname)=>{
  if(hasClass(target,cname)){
    removeClass(target,cname);
  }
  else{
    addClass(target,cname);
  }
};

export const resetObj=(obj)=>{
  var keys=Object.keys(obj);
  for(var i=0,j=keys.length;i<j;i++){
    obj[keys[i]]='';
  }
  return obj;
};

//对象赋值 深拷贝
export const cloneObj=(obj)=>{
  var str='',newobj=obj.constructor===Array?[]:{};
  if(typeof obj!=='object'){
    return;
  }
  /*else if(window.JSON){//浏览器支持json解析
    str=JSON.stringify(obj);
    newobj=JSON.pares(str);
  }*/
  else{
    for(var i in obj){
      newobj[i]=typeof obj[i]==='object'?cloneObj(obj[i]):obj[i];
    }
  }
  return newobj;
};

//返回顶部
/*export const backTop=(st)=>{
  let timer=setInterval(function(){
    if(st<=0){
      st=0;
      clearInterval(timer);
      return;
    }
    st-=50;
  },1);
};*/

//获取当前页面
export const getCurrent=(obj,str,data)=>{
  if(str){
    // 规定url书写规格。1.#/function/function1,2./function/function1
    // str=str[0].slice(0,str[0].length-1);
    str=str[1];
    if(str.split('/').length==2){str='#'+str;}
    obj.map((v,k)=>{
      if(v.subMenu&&v.subMenu.length>0){
        let flag=false;
        v.subMenu.map((sv,sk)=>{
          if(sv.url==str){
            data.subTitle=sv.title;
            flag=true;
            data.level=2;
            sv.selected='active';
          }
          else{
            sv.selected='';
          }
        });
        flag?(
          data.title=v.title,

          v.selMenu='active',
          v.open='open',
          v.toggleSlide={
            height:v.subMenu.length*32+16
          }
        ):(
          v.selMenu='',
          v.open='',
          v.toggleSlide={
            height:0
          }
        );
      }
      else{
        if(v.url==str){
          data.title=v.title;
          data.subTitle='';
          data.level=1;

          v.selMenu='active';
        }
        else{
          v.selMenu='';
          !!v.subMenu&&v.subMenu.map((sv,sk)=>{
            sv.selected='';
          });
        }
        
      }
    });
  }
  return obj;
};

//fullscreen
export const fs=(element)=>{
  if(!document.fullscreenElement&&/*!document.msFullscreenElement&&!document.mozFullScreenElement&&*/!document.webkitFullscreenElement){
    if(element.requestFullscreen){
      element.requestFullscreen();
    }
    else if(element.msRequestFullscreen){
      element.msRequestFullscreen();
    }
    else if(element.mozRequestFullscreen){
      element.mozRequestFullscreen();
    }
    else if(element.webkitRequestFullscreen){
      element.webkitRequestFullscreen();
    }
  }
  else{
    if(document.exitFullscreen){
      document.exitFullscreen();
    }
    /*else if(document.msExitFullscreen){
      document.msExitFullscreen();
    }
    else if(document.mozCanselFullscreen){
      document.mozCanselFullscreen();
    }*/
    else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }
  }
};
/*let ele=document.getElementsByClassName('fs')[0];
fs(ele);*/

// sort
export const ysort=(param1,param2)=>{
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












