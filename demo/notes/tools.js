
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
      var reg=new RegExp('(\\s|^)'+v+'(\\s|$)');  
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

//fullscreen
/*let ele=document.getElementsByClassName('fs')[0];
fs(ele);*/
export const fs=(element)=>{
  if(!document.fullscreenElement&&!document.msFullscreenElement&&!document.mozFullScreenElement&&!document.webkitFullscreenElement){
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
    else if(document.msExitFullscreen){
      document.msExitFullscreen();
    }
    else if(document.mozCanselFullscreen){
      document.mozCanselFullscreen();
    }
    else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }
  }
};














