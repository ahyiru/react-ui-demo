//判断是否含有class
export const hasClass=(target,cname)=>{
  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
};
//添加class
export const addClass=(target,cname)=>{
  let nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&!hasClass(target,v)){
      target.className+=' '+v;
    }
  });
};
//删除class
export const removeClass=(target,cname)=>{
  let nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&hasClass(target,v)){
      // let reg=new RegExp('(\\s|^)'+v+'(\\s|$)');
      let reg=new RegExp('(\\s|^)'+v);
      target.className=target.className.replace(reg,'');
    }
  });
};
//切换class
export const toggleClass=(target,cname)=>{
  if(hasClass(target,cname)){
    removeClass(target,cname);
  }else{
    addClass(target,cname);
  }
};

//返回顶部
export const backTop=(pix,time)=>{
  let ele=document.documentElement.scrollTop?document.documentElement:document.body;
  let timer=setInterval(()=>{
    if(ele.scrollTop<=0){
      ele.scrollTop=0;
      clearInterval(timer);
      return true;
    }
    ele.scrollTop-=pix;
  },time);
};

import {$clone} from './yiru-tools';
//获取当前页面--menu
export const getCurrent=(sidebarMenu,str)=>{
  let menu=$clone(sidebarMenu);
  if(str){
    // 规定url书写规格。#/function/function1
    // str=str[0].slice(0,str[0].length-1);
    let breadcrumb=[];
    str=str[1];
    if(str.split('/').length==2){str='#'+str;}
    menu.map((v,k)=>{
      if(v.subMenu&&v.subMenu.length>0){
        let flag=false,ls=v.subMenu.length;
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
            // let a=str.split('/');
            // let url='/'+a[a.length-2];
            if(str.indexOf(sv.url)>-1&&!flag){
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
            height:ls*32+16
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
        v.url.indexOf('#')<0&&(v.url='#'+v.url);
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
export const getBreadcrumb=(sidebarMenu,str)=>{
  let menu=$clone(sidebarMenu);
  if(str){
    str=str[1];
    // if(str.split('/').length==2){str='#'+str;}
    let data=[],tmp=[],level=-1,f=false;
    //获取当前页面--title
    const getTitle=(menu,str)=>{
      // level++;
      menu.map((v,k)=>{
        if(f) return false;
        let hasSub=v.subMenu&&v.subMenu.length>0;
        v.url=='/'&&(v.url='#/');
        if(str.indexOf(v.url)>-1&&!hasSub){
          let d={
            title:v.title,
            url:v.url.indexOf('javascript:;')>-1?v.url:'#'+v.url
          };
          tmp.push(d);
          if(v.url!=str){
            tmp.push({title:str.split('/')[str.split('/').length-1],url:str,cpage:true});
          }
          f=true;
          data=$clone(tmp);
          return data;
        }else{
          let ff=false;
          if(hasSub){
            let d={
              title:v.title,
              url:v.url.indexOf('javascript:;')>-1?v.url:'#'+v.url
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

// 全屏fullscreen
export const fullScreen=(element)=>{
  if(!document.fullscreenElement&&/*!document.msFullscreenElement&&!document.mozFullScreenElement&&*/!document.webkitFullscreenElement){
    if(element.requestFullscreen){
      element.requestFullscreen();
    }else if(element.msRequestFullscreen){
      element.msRequestFullscreen();
    }else if(element.mozRequestFullScreen){
      element.mozRequestFullScreen();
    }else if(element.webkitRequestFullscreen){
      element.webkitRequestFullscreen();
    }
  }else{
    if(document.exitFullscreen){
      document.exitFullscreen();
    }/*else if(document.msExitFullscreen){
      document.msExitFullscreen();
    }else if(document.mozCancelFullScreen){
      document.mozCancelFullScreen();
    }*/else if(document.webkitExitFullscreen){
      document.webkitExitFullscreen();
    }
  }
};
// 用法:
// let ele=document.getElementsByClassName('fs')[0];
// fs(ele);

// loading
export const loading=(ele)=>{
  let hasLoad=document.getElementsByClassName('y-loader')[0];
  if(!hasLoad){
    let div=document.createElement('div');
    let figure=document.createElement('figure');
    // obj.setAttribute('style','display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;opacity:0;');
    div.setAttribute('class','y-loader');
    figure.setAttribute('class','y-loading');
    div.appendChild(figure);

    ele.appendChild(div);
    ele.style.overflow='hidden';
  }else{
    ele.removeChild(hasLoad);
    ele.style.overflow='visible';
  }
  
  /*return {
    create:function(){
      ele.appendChild(div);
      ele.style.overflow='hidden';
    },
    remove:function(){
      ele.removeChild(hasLoad);
      ele.style.overflow='visible';
    }
  };*/
};

//格式化文本
export const formatTxt=(str)=>{
  str=str.replace(/\n/g,'<pclass="txt-line"></p>');
  str=str.replace(/\r/g,'<pclass="txt-line"></p>');
  str=str.replace(/\s/g,'<spanclass="txt-space"></span>');
  str=str.replace(/\t/g,'<spanclass="txt-space"></span>');
  str=str.replace(/pclass/g,'p class');
  str=str.replace(/spanclass/g,'span class');
  return str;
};









