/*ydnd*/
var dnd={

	/*`blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu`.split(' ').map(function(v,k){
		// var str=str.replace(/\r\n/ig,','); 
	});*/

	init:()=>{
		var ydnd:any=document.getElementsByClassName('ydnd');
		var ydrop:any=document.getElementsByClassName('ydrop');
		var ydrag:any=document.getElementsByClassName('ydrag');
		for(var i=0,l=ydrag.length;i<l;i++){
			ydrop[i].style.position='relative';
			ydrop[i].style.width='100%';
			// ydrop[i].style.transition='none';
			ydrag[i].style.cursor='move';
		};

		document.addEventListener('mousedown',dnd.mouseEvent.mousedown,false);
	},

	// set class
	hasClass:(target,cname)=>{
	  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
	},
	addClass:(target,cname)=>{
	  var nameArr=cname.split(' ');
	  nameArr.map((v,k)=>{
	    if(!!v&&!dnd.hasClass(target,v)){
	      target.className+=' '+v;
	    }
	  });
	},
	removeClass:(target,cname)=>{
	  var nameArr=cname.split(' ');
	  nameArr.map((v,k)=>{
	    if(!!v&&dnd.hasClass(target,v)){
	      // var reg=new RegExp('(\\s|^)'+v+'(\\s|$)');
      	var reg=new RegExp('(\\s|^)'+v);
	      target.className=target.className.replace(reg,'');
	    }
	  });
	},
	// insertAfter
	insertAfter:(newEle,oldEle)=>{
		var parent=oldEle.parentNode;
		parent.insertBefore(newEle,oldEle.nextSibling);
	},
	//create droparea
	createDroparea:(ele)=>{
		var droparea=document.createElement('div');
	  droparea.className='droparea';
		droparea.style.width='100%';
		droparea.style.height=ele.offsetHeight+'px';

		droparea.style.border='2px dashed #bbb';
		droparea.style.position='relative';
		droparea.style.backgroundColor='#f8f8f8';

		return droparea;
	},

	// mouse event
	mouseEvent:{
		x:0,
		y:0,
		ele:'',
		//mousemove
		move:function(ev){
			var ev=ev||window.event;
			// var ele=ev.target||ev.srcElement;
			var ele:any=dnd.mouseEvent.ele;

			dnd.addClass(ele,'ydragging');
		  //
		  ele.parentNode.style.width=ele.offsetWidth+'px';
			ele.parentNode.style.height=ele.offsetHeight+'px';
			// remove oldarea
			var oldarea=document.getElementsByClassName('droparea')[0];
			oldarea&&oldarea.parentNode.removeChild(oldarea);
			// create droparea
			var droparea=dnd.createDroparea(ele);
			dnd.insertAfter(droparea,ele);
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
			var _x=ev.pageX-dnd.mouseEvent.x,
					_y=ev.pageY-dnd.mouseEvent.y;
			// var w=document.body.clientWidth-ele.offsetWidth,
		 //      h=document.body.clientHeight-ele.offsetHeight;
		 //  _x=_x<0?0:_x>w?w:_x;
		 //  _y=_y<0?0:_y>h?h:_y;
		  ele.style.left=_x+'px';
			ele.style.top=_y+'px';
			
			// dragarea
			var drag_r=_x+ele.offsetWidth;
			var drag_b=_y+ele.offsetHeight;
			var drag_center=_x+ele.offsetWidth/2;
			var drag_middle=_y+ele.offsetHeight/2;
			//
			var ydrop:any=document.getElementsByClassName('ydrop');
			for(var i=0,l=ydrop.length;i<l;i++){
				//
				if(dnd.hasClass(ydrop[i],'ydragging')){continue;}
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
						dnd.insertAfter(droparea,ydrop[i]);
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
			// document.addEventListener('mouseup',dnd.mouseEvent.mouseup,false);
		},
		//mouseup
		mouseup:function(e){
			var e=e||window.event;
			// var ele=e.target||e.srcElement;
			var ele:any=dnd.mouseEvent.ele;
			// document.removeEventListener('mousedown',mousedown,false);
			document.removeEventListener('mousemove',dnd.mouseEvent.move,false);
			// console.log(ele.attributes);
			//
			var droparea:any=document.getElementsByClassName('droparea')[0];
			if(droparea){
				//
				dnd.removeClass(ele,'ydragging');
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
		},
		//mousedown
		mousedown:function(e){
			var e=e||window.event;
			var ele=e.target||e.srcElement;
			// console.log(e.target);
			if(e.button==0){//阻止右键点击 or e.which==1;
				if(dnd.hasClass(ele,'ydrag')){
					// e.preventDefault();//阻止默认事件
				  // e.stopPropagation();//阻止事件冒泡
				  //
				  ele=dnd.mouseEvent.ele=ele.parentNode;
				  // 数据缓存
				  // var dropData;
				  //
					dnd.mouseEvent.x=e.pageX-ele.offsetLeft;
					dnd.mouseEvent.y=e.pageY-ele.offsetTop;

					document.addEventListener('mousemove',dnd.mouseEvent.move,false);
				}
			}
			document.addEventListener('mouseup',dnd.mouseEvent.mouseup,false);
		}
	},

	// distroy mouse event
	distroy:()=>{
		document.removeEventListener('mousedown',dnd.mouseEvent.mousedown,false);
		document.removeEventListener('mouseup',dnd.mouseEvent.mouseup,false);
		document.removeEventListener('mousemove',dnd.mouseEvent.move,false);
	}

}
;

export default dnd;











