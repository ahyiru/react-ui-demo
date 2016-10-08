/*ydnd*/

/*`blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu`.split(' ').map(function(v,k){
	// var str=str.replace(/\r\n/ig,','); 
});*/

// start className
var hasClass=(target,cname)=>{
  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
};
var addClass=(target,cname)=>{
  var nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&!hasClass(target,v)){
      target.className+=' '+v;
    }
  });
};
var removeClass=(target,cname)=>{
  var nameArr=cname.split(' ');
  nameArr.map((v,k)=>{
    if(!!v&&hasClass(target,v)){
      var reg=new RegExp('(\\s|^)'+v+'(\\s|$)');  
      target.className=target.className.replace(reg,'');
    }
  });
};
// end className

// insertAfter
var insertAfter=function(newEle,oldEle){
	var parent=oldEle.parentNode;
	parent.insertBefore(newEle,oldEle.nextSibling);
};
//create droparea
var createDroparea=function(ele){
	var droparea=document.createElement('div');
  droparea.className='droparea';
	droparea.style.width='100%';
	droparea.style.height=ele.offsetHeight+'px';

	droparea.style.border='2px dashed #bbb';
	droparea.style.position='relative';
	droparea.style.backgroundColor='#f8f8f8';

	return droparea;
};
//
var x,y,ele;
var move=function(ev){
	var ev=ev||window.event;
	// var ele=ev.target||ev.srcElement;

	addClass(ele,'ydragging');
  //
  ele.parentNode.style.width=ele.offsetWidth+'px';
	ele.parentNode.style.height=ele.offsetHeight+'px';
	// remove oldarea
	var oldarea=document.getElementsByClassName('droparea')[0];
	oldarea&&oldarea.parentNode.removeChild(oldarea);
	// create droparea
	var droparea=createDroparea(ele);
	insertAfter(droparea,ele);
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
	var _x=ev.pageX-x,
			_y=ev.pageY-y;
	/*var w=document.body.clientWidth-ele.offsetWidth,
      h=document.body.clientHeight-ele.offsetHeight;
  _x=_x<0?0:_x>w?w:_x;
  _y=_y<0?0:_y>h?h:_y;*/
  ele.style.left=_x+'px';
	ele.style.top=_y+'px';
	
	// dragarea
	var drag_r=_x+ele.offsetWidth;
	var drag_b=_y+ele.offsetHeight;
	var drag_center=_x+ele.offsetWidth/2;
	var drag_middle=_y+ele.offsetHeight/2;
	for(var i=0,l=ydrop.length;i<l;i++){
		//
		if(hasClass(ydrop[i],'ydragging')){continue;}
		var drop_l=ydrop[i].offsetLeft;
		var drop_t=ydrop[i].offsetTop;
		var drop_r=ydrop[i].offsetLeft+ydrop[i].offsetWidth;
		var drop_b=ydrop[i].offsetTop+ydrop[i].offsetHeight;
		var drop_center=ydrop[i].offsetLeft+ydrop[i].offsetWidth/2;
		var drop_middle=ydrop[i].offsetTop+ydrop[i].offsetHeight/2;
		//
		if((drag_center>drop_l&&drag_center<drop_r&&drag_middle>drop_t&&drag_middle<drop_b)||(drop_center>_x&&drop_center<drag_r&&drop_middle>_y&&drop_middle<drag_b)){
			// remove oldarea
			var oldarea=document.getElementsByClassName('droparea')[0];
			oldarea&&oldarea.parentNode.removeChild(oldarea);
			// create droparea
			if(drag_middle>drop_middle){
				insertAfter(droparea,ydrop[i]);
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
};
var mousedown=function(e){
	var e=e||window.event;
	ele=e.target||e.srcElement;
	if(e.button==0){//阻止右键点击 or e.which==1;
		if(hasClass(ele,'ydrag')){
			// e.preventDefault();//阻止默认事件
		  // e.stopPropagation();//阻止事件冒泡
		  //
		  ele=ele.parentNode;
		  // 数据缓存
		  // var dropData;
		  //
			x=e.pageX-ele.offsetLeft;
			y=e.pageY-ele.offsetTop;

			document.addEventListener('mousemove',move,false);
		}
	}
};
var mouseup=function(e){
	/*var e=e||window.event;
	var ele=e.target||e.srcElement;*/
	// document.removeEventListener('mousedown',mousedown,false);
	document.removeEventListener('mousemove',move,false);
	// console.log(ele.attributes);
	//
	var droparea=document.getElementsByClassName('droparea')[0];
	if(droparea){
		//
		removeClass(ele,'ydragging');
		//
		ele.style.transition='all .3s ease-in-out';// 放在定位top,left上面 y??
		ele.style.top=droparea.offsetTop+'px';
		ele.style.left=droparea.offsetLeft+'px';
		//
		setTimeout(function(){
			var newNode=ele.cloneNode(true);
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
};

document.addEventListener('mouseup',mouseup,false);

document.addEventListener('mousedown',mousedown,false);

var ydnd=document.getElementsByClassName('ydnd');
var ydrop=document.getElementsByClassName('ydrop');
var ydrag=document.getElementsByClassName('ydrag');
for(var i=0,l=ydrag.length;i<l;i++){
	ydrop[i].style.position='relative';
	ydrop[i].style.width='100%';
	// ydrop[i].style.transition='none';
	ydrag[i].style.cursor='move';
};















