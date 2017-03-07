import {hasClass,addClass,removeClass} from './dom-tools';
//拖拽事件 drag and drop
const dnd={
  /*`blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu`.split(' ').map(function(v,k){
    // let str=str.replace(/\r\n/ig,','); 
  });*/
  globalTmp:{
    drop:document.getElementsByClassName('ydrop'),
    drag:document.getElementsByClassName('ydrag'),
    // insertAfter
    insertAfter:(newEle,oldEle)=>{
      let parent=oldEle.parentNode;
      parent.insertBefore(newEle,oldEle.nextSibling);
    },
    //create droparea
    createDroparea:(ele)=>{
      let droparea=document.createElement('div');
      droparea.className='droparea';
      droparea.style.width=ele.offsetWidth+'px';
      droparea.style.height=ele.offsetHeight+'px';
      droparea.style.border='2px dashed #bbb';
      droparea.style.position='relative';
      droparea.style.backgroundColor='#f8f8f8';
      return droparea;
    },
    x:0,
    y:0,
    ele:null,
  },
  // init dnd
  init:()=>{
    // let dnd:any=document.getElementsByClassName('ydnd');
    // let drop:any=document.getElementsByClassName('ydrop');
    // let drag:any=document.getElementsByClassName('ydrag');
    dnd.globalTmp.x=0;
    dnd.globalTmp.y=0;
    dnd.globalTmp.ele=null;
    let drop:any=dnd.globalTmp.drop,
        drag:any=dnd.globalTmp.drag;
    for(let i=0,l=drag.length;i<l;i++){
      drop[i].style.position='relative';
      drop[i].style.width='100%';
      // ydrop[i].style.transition='none';
      drag[i].style.cursor='move';
    };
    document.addEventListener('mousedown',dnd.mousedown,false);
  },
  //mousemove
  move:function(event){
    let ev=event||window.event;
    ev.preventDefault();
    // let ele=ev.target||ev.srcElement;
    let ele=dnd.globalTmp.ele;

    addClass(ele,'ydragging');
    //
    ele.parentNode.style.width=ele.offsetWidth+'px';
    ele.parentNode.style.height=ele.offsetHeight+'px';
    // remove oldarea
    let oldarea=document.getElementsByClassName('droparea')[0];
    oldarea&&oldarea.parentNode.removeChild(oldarea);
    // create droparea
    let droparea=dnd.globalTmp.createDroparea(ele);
    dnd.globalTmp.insertAfter(droparea,ele);
    //
    ele.parentNode.style.width='auto';
    ele.parentNode.style.height='auto';
    //
    ele.style.transition='none';
    ele.style.width=ele.offsetWidth+'px';
    ele.style.height=ele.offsetHeight+'px';
    ele.style.position='absolute';
    ele.style.zIndex='99999';
    //
    let _x=ev.pageX-dnd.globalTmp.x,
        _y=ev.pageY-dnd.globalTmp.y;
    // let w=document.body.clientWidth-ele.offsetWidth,
    //     h=document.body.clientHeight-ele.offsetHeight;
    //   _x=_x<0?0:_x>w?w:_x;
    //   _y=_y<0?0:_y>h?h:_y;
    ele.style.left=_x+'px';
    ele.style.top=_y+'px';
    
    // dragarea
    let drag_r=_x+ele.offsetWidth;
    let drag_b=_y+ele.offsetHeight;
    let drag_center=_x+ele.offsetWidth/2;
    let drag_middle=_y+ele.offsetHeight/2;
    //
    let ydrop:any=document.getElementsByClassName('ydrop');
    for(let i=0,l=ydrop.length;i<l;i++){
      //
      if(hasClass(ydrop[i],'ydragging')){continue;}
      let drop_l=ydrop[i].offsetLeft;
      let drop_t=ydrop[i].offsetTop;
      let drop_r=ydrop[i].offsetLeft+ydrop[i].offsetWidth;
      let drop_b=ydrop[i].offsetTop+ydrop[i].offsetHeight;
      let drop_center=ydrop[i].offsetLeft+ydrop[i].offsetWidth/2;
      let drop_middle=ydrop[i].offsetTop+ydrop[i].offsetHeight/2;
      //
      if((drag_center>drop_l&&drag_center<drop_r&&drag_middle>drop_t&&drag_middle<drop_b)||(drop_center>_x&&drop_center<drag_r&&drop_middle>_y&&drop_middle<drag_b)){
        // remove oldarea
        let oldarea=document.getElementsByClassName('droparea')[0];
        oldarea&&oldarea.parentNode.removeChild(oldarea);
        // create droparea
        if(drag_middle>drop_middle){
          dnd.globalTmp.insertAfter(droparea,ydrop[i]);
        }
        else{
          ydrop[i].parentNode.insertBefore(droparea,ydrop[i]);
        }
        //
        break;
      }
      else{
        //
      }
    };

    //
    document.addEventListener('mouseup',dnd.mouseup,false);
  },
  //mouseup
  mouseup:function(event){
    let e=event||window.event;
    // let ele=e.target||e.srcElement;
    let ele=dnd.globalTmp.ele;
    // document.removeEventListener('mousedown',mousedown,false);
    document.removeEventListener('mousemove',dnd.move,false);
    // console.log(ele.attributes);
    //
    let droparea:any=document.getElementsByClassName('droparea')[0];
    if(droparea){
      //
      removeClass(ele,'ydragging');
      //
      ele.style.transition='all .3s ease-in-out';// 放在定位top,left上面 y??
      ele.style.top=droparea.offsetTop+'px';
      ele.style.left=droparea.offsetLeft+'px';
      //
      setTimeout(function(){
        let newNode=ele.cloneNode(true);
        droparea.parentNode.replaceChild(newNode,droparea);
        //
        newNode.style.position='relative';
        newNode.style.left=0;
        newNode.style.top=0;
        newNode.style.width='100%';
        newNode.style.zIndex='auto';
        //
        ele.parentNode.removeChild(ele);
      },308);
      
    }
    else{
      //
    }
    //
  },
  //mousedown
  mousedown:function(event){
    let e=event||window.event;
    let ele=e.target||e.srcElement;
    // console.log(e.target);
    if(e.button==0){//阻止右键点击 or e.which==1;
      if(hasClass(ele,'ydrag')){
        // e.preventDefault();//阻止默认事件
        // e.stopPropagation();//阻止事件冒泡
        //
        ele=dnd.globalTmp.ele=ele.parentNode;
        // 数据缓存
        // let dropData;
        //
        dnd.globalTmp.x=e.pageX-ele.offsetLeft;
        dnd.globalTmp.y=e.pageY-ele.offsetTop;

        document.addEventListener('mousemove',dnd.move,false);
      }
    }
    // document.addEventListener('mouseup',dnd.mouseup,false);
  },
  // distroy mouse event
  distroy:()=>{
    document.removeEventListener('mousedown',dnd.mousedown,false);
    document.removeEventListener('mouseup',dnd.mouseup,false);
    document.removeEventListener('mousemove',dnd.move,false);
  },
};
export default dnd;

