/*ydrag*/
var drag={

	/*`blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu`.split(' ').map(function(v,k){
		// var str=str.replace(/\r\n/ig,','); 
	});*/

	init:()=>{
		var ydrop:any=document.getElementsByClassName('drop');
		// var ydrag:any=document.getElementsByClassName('draglist')[0];
		var ydrag:any=document.getElementsByClassName('ant-tree-title');
		// ydrag=ydrag.children;
		for(var i=0,l=ydrag.length;i<l;i++){
			// ydrop[i].style.position='relative';
			// ydrop[i].style.width='100%';
			// ydrop[i].style.transition='none';
			
			// ydrag[i].style.cursor='move';
		};

		drag.removeList(ydrop);

		document.addEventListener('mousedown',drag.mouseEvent.mousedown,false);
	},

	// set class
	hasClass:(target,cname)=>{
	  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
	},
	addClass:(target,cname)=>{
	  var nameArr=cname.split(' ');
	  nameArr.map((v,k)=>{
	    if(!!v&&!drag.hasClass(target,v)){
	      target.className+=' '+v;
	    }
	  });
	},
	removeClass:(target,cname)=>{
	  var nameArr=cname.split(' ');
	  nameArr.map((v,k)=>{
	    if(!!v&&drag.hasClass(target,v)){
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
	  droparea.style.width=ele.offsetWidth+'px';
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
			var ele:any=drag.mouseEvent.ele;

			drag.addClass(ele,'ydragging');

			// remove oldarea
			var oldarea=document.getElementsByClassName('droparea')[0];
			oldarea&&oldarea.parentNode.removeChild(oldarea);
			// create droparea
			var droparea=drag.createDroparea(ele);
			drag.insertAfter(droparea,ele);
			//
			ele.parentNode.style.width='auto';
			ele.parentNode.style.height='auto';
		  //
		  ele.style.transition='none';
		  ele.style.width=ele.offsetWidth+'px';
		  ele.style.height=ele.offsetHeight+'px';
			ele.style.position='fixed';
			ele.style.zIndex='99999';
			ele.style.backgroundColor='#d5f1fd';
			//
			var _x=ev.clientX-drag.mouseEvent.x,
					_y=ev.clientY-drag.mouseEvent.y;
			// var w=document.body.clientWidth-ele.offsetWidth,
		  //     h=document.body.clientHeight-ele.offsetHeight;
		  // _x=_x<0?0:_x>w?w:_x;
		  // _y=_y<0?0:_y>h?h:_y;
		  ele.style.left=_x+'px';
			ele.style.top=_y+'px';
			
			// dragarea
			var drag_r=_x+ele.offsetWidth;
			var drag_b=_y+ele.offsetHeight;
			//
			var drop:any=document.getElementsByClassName('drop');
			for(var i=0,l=drop.length;i<l;i++){
				//
				if(drag.hasClass(drop[i],'ydragging')){continue;}
				var drop_l=drop[i].getBoundingClientRect().left;
				var drop_t=drop[i].getBoundingClientRect().top;
				var drop_r=drop[i].getBoundingClientRect().left+drop[i].offsetWidth;
				var drop_b=drop[i].getBoundingClientRect().top+drop[i].offsetHeight;
				//
				for(var k=0,kl=drop.length;k<kl;k++){
					drag.removeClass(drop[k],'candrop');
					drop[k].style.border='1px solid #eee';
				}
				//
				if(drag_r>drop_l&&_x<drop_r&&drag_b>drop_t&&_y<drop_b){
					drop[i].style.border='2px dashed #bbb';
					drag.addClass(drop[i],'candrop');
					//
					break;
				}
				else{
					//
					// drop[i].style.border='1px solid #eee';
				}
			};

			//
			document.addEventListener('mouseup',drag.mouseEvent.mouseup,false);
		},
		//mouseup
		mouseup:function(e){
			var e=e||window.event;
			// var ele=e.target||e.srcElement;
			var ele:any=drag.mouseEvent.ele;
			// document.removeEventListener('mousedown',mousedown,false);
			document.removeEventListener('mousemove',drag.mouseEvent.move,false);
			// console.log(ele.attributes);
			//
			var canDrop:any=document.getElementsByClassName('candrop')[0];
			var droparea:any=document.getElementsByClassName('droparea')[0];
			if(droparea){
				droparea.parentNode.removeChild(droparea);
				//
				drag.removeClass(ele,'ydragging');
				//
				if(canDrop){
					drag.removeClass(canDrop,'candrop');
					canDrop.style.border='1px solid #eee';
					//
					var span=document.createElement('span');
					span.innerText=ele.innerText;
					span.title=ele.parentNode.title;
					var isNew=true;
					var dropList=canDrop.children;
					if(dropList){
						for(var i=0,l=dropList.length;i<l;i++){
							// if(dropList[i].innerText.slice(0,dropList[i].innerText.length-1)==span.innerText){
							if(dropList[i].innerText==span.innerText){
								isNew=false;
								break;
							}
						}
					}
					if(isNew){
						var ix=document.createElement('i');
						// ix.innerText='x';
						ix.className='fa fa-times-circle';
						span.appendChild(ix);
						canDrop.appendChild(span);
						//
						ele.style.position='relative';
						ele.style.left=0;
						ele.style.top=0;
						ele.style.zIndex='auto';
						ele.style.backgroundColor='transparent';
						//
						ix.addEventListener('click',function(){
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
		},
		//mousedown
		mousedown:function(e){
			var e=e||window.event;
			var ele=drag.mouseEvent.ele=e.target||e.srcElement;
			// console.log(e.target);
			if(e.button==0){//阻止右键点击 or e.which==1;
				if(drag.hasClass(ele,'ant-tree-title')&&!ele.parentNode.nextSibling){
					// e.preventDefault();//阻止默认事件
				  // e.stopPropagation();//阻止事件冒泡
				  //
				  // ele=drag.mouseEvent.ele=ele.parentNode;
				  // 数据缓存
				  // var dropData;

				  // console.log(ele.offsetLeft+','+ele.offsetTop);
				  // getBoundingClientRect().left相对于浏览器定位。
				  // console.log(ele.getBoundingClientRect().left+','+ele.getBoundingClientRect().top);

				  //
				  ele.style.cursor='move';

				  //	pageX相对于文档定位，clientX相对于可视区域定位。
					drag.mouseEvent.x=e.pageX-ele.getBoundingClientRect().left;
					drag.mouseEvent.y=e.pageY-ele.getBoundingClientRect().top;
					// drag.mouseEvent.x=e.clientX-ele.getBoundingClientRect().left;
					// drag.mouseEvent.y=e.clientY-ele.getBoundingClientRect().top;

					document.addEventListener('mousemove',drag.mouseEvent.move,false);
				}
			}
		}
	},

	// distroy mouse event
	distroy:()=>{
		document.removeEventListener('mousedown',drag.mouseEvent.mousedown,false);
		document.removeEventListener('mouseup',drag.mouseEvent.mouseup,false);
		document.removeEventListener('mousemove',drag.mouseEvent.move,false);
	},

	// remove listener
	removeList:(drop)=>{
		for(var i=0,l=drop.length;i<l;i++){
			var span=drop[i].children;
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
	}

}
;

export default drag;











