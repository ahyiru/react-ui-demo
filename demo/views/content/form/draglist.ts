/*drag*/
const drag={

	/*`blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu`.split(' ').map(function(v,k){
		// var str=str.replace(/\r\n/ig,','); 
	});*/

	globalTmp:{
		drop:document.getElementsByClassName('ydrop'),
		drag:document.getElementsByClassName('draglist')[0],

		// set class
		hasClass:(target,cname)=>{
		  return target.className.match(new RegExp('(\\s|^)'+cname+'(\\s|$)')); 
		},
		addClass:(target,cname)=>{
		  var nameArr=cname.split(' ');
		  nameArr.map((v,k)=>{
		    if(!!v&&!drag.globalTmp.hasClass(target,v)){
		      target.className+=' '+v;
		    }
		  });
		},
		removeClass:(target,cname)=>{
		  var nameArr=cname.split(' ');
		  nameArr.map((v,k)=>{
		    if(!!v&&drag.globalTmp.hasClass(target,v)){
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
			// droparea.style.width='100%';
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

	// init draglist
	init:()=>{
		drag.globalTmp.x=0;
		drag.globalTmp.y=0;
		drag.globalTmp.ele=null;
		var drop:any=drag.globalTmp.drop,
				dragList:any=drag.globalTmp.drag;
		// var ydrag:any=document.getElementsByClassName('draglist')[0];
		// ydrag=ydrag.children;
		/*for(var i=0,l=ydrag.length;i<l;i++){
			// ydrop[i].style.position='relative';
			// ydrop[i].style.width='100%';
			// ydrop[i].style.transition='none';
			// ydrag[i].style.cursor='move';
		};*/
		drag.removeList(drop);

		document.addEventListener('mousedown',drag.mousedown,false);
	},

	/* mouse event*/

	//mousemove
	move:function(ev){
		var ev=ev||window.event;
		ev.preventDefault();
		// var ele=ev.target||ev.srcElement;
		var ele:any=drag.globalTmp.ele;

		drag.globalTmp.addClass(ele,'ydragging');

		// remove oldarea
		var oldarea=document.getElementsByClassName('droparea')[0];
		oldarea&&oldarea.parentNode.removeChild(oldarea);
		// create droparea
		var droparea=drag.globalTmp.createDroparea(ele);
		drag.globalTmp.insertAfter(droparea,ele);
		//
		ele.parentNode.style.width='auto';
		ele.parentNode.style.height='auto';
	  //
	  ele.style.transition='none';
	  ele.style.width=ele.offsetWidth+'px';
	  ele.style.height=ele.offsetHeight+'px';
		ele.style.position='absolute';
		ele.style.zIndex='99999';
		ele.style.backgroundColor='#bbb';
		//
		var _x=ev.pageX-drag.globalTmp.x,
				_y=ev.pageY-drag.globalTmp.y;
		// var w=document.body.clientWidth-ele.offsetWidth,
	  //     h=document.body.clientHeight-ele.offsetHeight;
	  //	 _x=_x<0?0:_x>w?w:_x;
	  //   _y=_y<0?0:_y>h?h:_y;
	  ele.style.left=_x+'px';
		ele.style.top=_y+'px';
		
		// dragarea
		var drag_r=_x+ele.offsetWidth;
		var drag_b=_y+ele.offsetHeight;
		//
		var drop:any=document.getElementsByClassName('drop');
		for(var i=0,l=drop.length;i<l;i++){
			//
			if(drag.globalTmp.hasClass(drop[i],'ydragging')){continue;}
			var drop_l=drop[i].offsetLeft;
			var drop_t=drop[i].offsetTop;
			var drop_r=drop[i].offsetLeft+drop[i].offsetWidth;
			var drop_b=drop[i].offsetTop+drop[i].offsetHeight;
			//
			for(var k=0,kl=drop.length;k<kl;k++){
				drag.globalTmp.removeClass(drop[k],'candrop');
				drop[k].style.border='1px solid #eee';
			}
			//
			if(drag_r>drop_l&&_x<drop_r&&drag_b>drop_t&&_y<drop_b){
				drop[i].style.border='2px dashed #bbb';
				drag.globalTmp.addClass(drop[i],'candrop');
				//
				break;
			}
			else{
				//
				// drop[i].style.border='1px solid #eee';
			}
		};

		//
		document.addEventListener('mouseup',drag.mouseup,false);
	},
	//mouseup
	mouseup:function(e){
		var e=e||window.event;
		// var ele=e.target||e.srcElement;
		var ele:any=drag.globalTmp.ele;
		// document.removeEventListener('mousedown',mousedown,false);
		document.removeEventListener('mousemove',drag.move,false);
		// console.log(ele.attributes);
		//
		var canDrop:any=document.getElementsByClassName('candrop')[0];
		var droparea:any=document.getElementsByClassName('droparea')[0];
		if(droparea){
			droparea.parentNode.removeChild(droparea);
			//
			drag.globalTmp.removeClass(ele,'ydragging');
			//
			if(canDrop){
				drag.globalTmp.removeClass(canDrop,'candrop');
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
					var ix=document.createElement('i');
					ix.innerText='x';
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
		var ele=drag.globalTmp.ele=e.target||e.srcElement;
		// console.log(e.target);
		if(e.button==0){//阻止右键点击 or e.which==1;
			if(drag.globalTmp.hasClass(ele.parentNode,'draglist')){
				// e.preventDefault();//阻止默认事件
			  // e.stopPropagation();//阻止事件冒泡
			  //
			  // ele=drag.globalTmp.ele=ele.parentNode;
			  // 数据缓存
			  // var dropData;
			  //
			  ele.style.cursor='move';

				drag.globalTmp.x=e.pageX-ele.offsetLeft;
				drag.globalTmp.y=e.pageY-ele.offsetTop;

				document.addEventListener('mousemove',drag.move,false);
			}
		}
	},

	// distroy mouse event
	distroy:()=>{
		document.removeEventListener('mousedown',drag.mousedown,false);
		document.removeEventListener('mouseup',drag.mouseup,false);
		document.removeEventListener('mousemove',drag.move,false);
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











