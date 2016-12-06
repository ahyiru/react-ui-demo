
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
export const cloneObj=(obj):any=>{
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

//获取当前页面--menu
export const getCurrent=(menu,str)=>{
  if(str){
    // 规定url书写规格。#/function/function1
    // str=str[0].slice(0,str[0].length-1);
    str=str[1];
    if(str.split('/').length==2){str='#'+str;}
    menu.map((v,k)=>{
      if(v.subMenu&&v.subMenu.length>0){
        let flag=false;
        v.subMenu.map((sv,sk)=>{
          if(sv.url==str){
            /*data.url='#'+sv.url;
            data.subTitle=sv.title;
            data.level=2;*/
            flag=true;
            sv.selected='active';
          }
          else{
            sv.selected='';
            let a=str.split('/');
            let url='/'+a[a.length-2];
            if(url==sv.url&&!flag){
              sv.selected='active';
              flag=true;
            }
          }
        });
        flag?(
          // data.title=v.title,
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
          /*data.url=v.url;
          data.title=v.title;
          data.subTitle='';
          data.level=1;*/
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
  return menu;
};
//获取当前页面--breadcrumb
export const getBreadcrumb=(menu,str)=>{
  if(str){
    str=str[1];
    if(str.split('/').length==2){str='#'+str;}
    let data=[],tmp=[],level=-1,f=false;
    //获取当前页面--title
    const getTitle=(menu,str)=>{
      level++;
      menu.map((v,k):any=>{
        if(f) return false;
        if(v.url==str){
          let d={
            title:v.title,
            url:'#'+v.url
          };
          tmp.push(d);
          f=true;
          data=cloneObj(tmp);
          return data;
        }
        else{
          let ff=false;
          if(v.subMenu&&v.subMenu.length>0){
            let d={
              title:v.title,
              url:'#'+v.url
            };
            tmp.push(d);
            ff=true;
            getTitle(v.subMenu,str);
          }
          // console.log(ff);
          if(ff) tmp=[];
        }
      });
      return data;
    };
    return getTitle(menu,str);
  }
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

//数组去重
export const yunique=(arr)=>{
  var result=[],tmp={};
  for(var i=0,ele;(ele=arr[i])!=null;i++){
    if(!tmp[ele]){
      result.push(ele);
      tmp[ele]=true;
    }
  }
  return result;
};












