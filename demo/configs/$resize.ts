//改变窗口大小时触发事件 resize
const $resize=(element,fn)=>{
  // let window=this;
  let document:any=window.document;
  let attachEvent=document.attachEvent;
  let isIE=(typeof navigator!=='undefined')?(navigator.userAgent.match(/Trident/)||navigator.userAgent.match(/Edge/)):null;
  let requestFrame=(()=>{
    let raf=window.requestAnimationFrame       ||
            window.webkitRequestAnimationFrame ||
         // window.mozRequestAnimationFrame    ||
            function callbackRAF(callback){
              return window.setTimeout(callback,1000/60);
            };
    return function requestFrameFunc(func){
      return raf(func);
    };
  })();
  let cancelFrame=(()=>{
    let cancel=window.cancelAnimationFrame       ||
               window.webkitCancelAnimationFrame ||
            // window.mozCancelAnimationFrame    ||
               window.clearTimeout;
    return function cancelFrameFunc(id){
      return cancel(id);
    };
  })();
  let resizeListener=(e)=>{
    let ele=e.target||e.srcElement;
    if(ele.__resizeRAF__){
      cancelFrame(ele.__resizeRAF__);
    }
    ele.__resizeRAF__=requestFrame(()=>{
      let trigger=ele.__resizeTrigger__;
      if(trigger!==undefined){
        trigger.__resizeListeners__.forEach((func)=>{
          func.call(trigger,e);
        });
      }
    });
  };
  let objectLoad=function(){
    this.contentDocument.defaultView.__resizeTrigger__=this.__resizeElement__;
    this.contentDocument.defaultView.addEventListener('resize',resizeListener,false);
  };
  // init
  let resize=()=>{
    if(!element.__resizeListeners__){
      element.__resizeListeners__=[];
      if(attachEvent){
        element.__resizeTrigger__=element;
        element.attachEvent('onresize',resizeListener);
      }else{
        if(getComputedStyle(element).position==='static'){
          element.style.position='relative';
        }
        let obj=element.__resizeTrigger__=document.createElement('object');
        obj.setAttribute('style','display:block;position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden;pointer-events:none;z-index:-1;opacity:0;');
        obj.setAttribute('class','resize-sensor');
        obj.__resizeElement__=element;
        obj.onload=objectLoad;
        obj.type='text/html';
        if(isIE){
          element.appendChild(obj);
        }
        obj.data='about:blank';
        if(!isIE){
          element.appendChild(obj);
        }
      }
    }
    element.__resizeListeners__.push(fn);
  };
  // unbind
  let unbind=()=>{
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn),1);
    if(!element.__resizeListeners__.length){
      if(attachEvent){
        element.detachEvent('onresize',resizeListener);
      }else{
        element.__resizeTrigger__.contentDocument.defaultView.removeEventListener('resize',resizeListener,false);
        element.__resizeTrigger__=!element.removeChild(element.__resizeTrigger__);
      }
    }
  };
  return {
    resize:resize,
    unbind:unbind,
  };
};
export default $resize;
