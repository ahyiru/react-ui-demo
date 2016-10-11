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
	droparea.style.width=ele.offsetWidth+'px';
	droparea.style.height=ele.offsetHeight+'px';

	droparea.style.border='2px dashed #bbb';
	droparea.style.position='relative';
	droparea.style.backgroundColor='#f8f8f8';

	return droparea;
};
//
var x,y,ele,canDrop;
var move=function(ev){
	var ev=ev||window.event;
	// var ele=ev.target||ev.srcElement;

	addClass(ele,'ydragging');

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
	ele.style.backgroundColor='#aaa';
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
	for(var i=0,l=ydrop.length;i<l;i++){
		//
		if(hasClass(ydrop[i],'ydragging')){continue;}
		var drop_l=ydrop[i].offsetLeft;
		var drop_t=ydrop[i].offsetTop;
		var drop_r=ydrop[i].offsetLeft+ydrop[i].offsetWidth;
		var drop_b=ydrop[i].offsetTop+ydrop[i].offsetHeight;
		//
		for(var k=0,kl=ydrop.length;k<kl;k++){
			removeClass(ydrop[k],'candrop');
			ydrop[k].style.border='1px solid #eee';
		}
		//
		if(drag_r>drop_l&&_x<drop_r&&drag_b>drop_t&&_y<drop_b){
			ydrop[i].style.border='2px dashed #bbb';
			addClass(ydrop[i],'candrop');
			//
			break;
		}
		else{
			//
			// ydrop[i].style.border='1px solid #eee';
		}
	};
};
var mousedown=function(e){
	var e=e||window.event;
	ele=e.target||e.srcElement;
	if(e.button==0){//阻止右键点击 or e.which==1;
		if(hasClass(ele.parentNode,'draglist')){
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
	var canDrop=document.getElementsByClassName('candrop')[0];
	var droparea=document.getElementsByClassName('droparea')[0];
	if(droparea){
		droparea.parentNode.removeChild(droparea);
		//
		removeClass(ele,'ydragging');
		
		if(canDrop){
			removeClass(canDrop,'candrop');
			canDrop.style.border='1px solid #eee';
			//
			var span=document.createElement('span');
			span.innerText=ele.innerText;
			var isNew=true;
			var dropList=canDrop.children;
			if(dropList){
				for(var i=0,l=dropList.length;i<l;i++){
					if(dropList[i].innerText.slice(0,dropList[i].innerText.length-1)==span.innerText){
						isNew=false;
						break;
					}
				}
			}
			if(isNew){
				var i=document.createElement('i');
				i.innerText='x';
				span.appendChild(i);
				canDrop.appendChild(span);
				//
				ele.style.position='relative';
				ele.style.left=0;
				ele.style.top=0;
				ele.style.zIndex='auto';
				ele.style.backgroundColor='transparent';
				//
				i.addEventListener('click',function(){
					var span=this.parentNode;
					span.parentNode.removeChild(span);
				},false);
			}
			else{
				ele.style.position='relative';
				ele.style.left=0;
				ele.style.top=0;
				ele.style.zIndex='auto';
				ele.style.backgroundColor='transparent';
			}
		}
		else{
			//
			ele.style.position='relative';
			ele.style.left=0;
			ele.style.top=0;
			ele.style.zIndex='auto';
			ele.style.backgroundColor='transparent';
		}
	}
	//
};

document.addEventListener('mouseup',mouseup,false);

document.addEventListener('mousedown',mousedown,false);

var ydrop=document.getElementsByClassName('drop');
var ydrag=document.getElementsByClassName('draglist')[0].children;
for(var i=0,l=ydrag.length;i<l;i++){
	/*ydrop[i].style.position='relative';
	ydrop[i].style.width='100%';*/
	// ydrop[i].style.transition='none';
	ydrag[i].style.cursor='move';
};

// remove
// console.log(ydrop[0].children[0].children[0]);
// var span=[],ix=[];

var removeList=function(drop){
	for(var i=0,l=ydrop.length;i<l;i++){
		var span=ydrop[i].children;
		if(span){
			for(var j=0,jl=span.length;j<jl;j++){
				var ix=span[j].children[0];
				ix.addEventListener('click',function(){
					var span=this.parentNode;
					span.parentNode.removeChild(span);
				},false);
			}
		}
	};
};
removeList(ydrop);












