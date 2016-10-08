'use strict';
/* function.js */

$(function(){

	var app={
		name:'test',
		version:'0.0.1',
		collapse:false,
		setting:{}
	};
 
 	//dropdown
	$('.y-dropdown').on('click',function(e){
		$('.right-bar').removeClass('open');
		e.stopPropagation();
		$(this).toggleClass('open').siblings().removeClass('open');
	});
	$(document).on('click',function(e){
		e.stopPropagation();
		$('.y-dropdown').removeClass('open');
	});

	//rightbar
	$('.toggle-right-sidebar').on('click',function(e){
		$('.right-bar').toggleClass('open');
	});
	//tabs
	$('.y-tab>li').each(function(i){
		$(this).on('click',function(){
			$(this).addClass('active').siblings().removeClass('active');
			$('.y-tab-page').eq(i).addClass('active').siblings().removeClass('active');

			$('.y-tab-act').css('left',64*i);
		})
	});

	//聚焦选中项
	var revertSel=function(){
		$('.y-sidebar-l1>li>ul').css('height',0);
 		$('.y-sidebar-l1>li>ul>li>a').each(function(i){
		 	if($(this).hasClass('active')){
		 		$(this).parent().parent().parent().siblings().find('>a').removeClass('active');
		 		$(this).parent().parent().css('height','auto');
		 		// ySlide($(this).parent().parent(),false);
		 		$(this).parent().parent().prev().addClass('active');
		 		$(this).parent().parent().parent().addClass('open').siblings().removeClass('open');
		 	}
		});
		$('.y-sidebar-l1>li>a').each(function(){
		 	if($(this).hasClass('active1')){
		 		$(this).addClass('active').parent().siblings().find('>a').removeClass('active');
		 	}
		});
 	};

	//sidebar-collapse
	$('.sidebar-collapse').on('click',function(){
		$('body').toggleClass('y-collapse');
		app.collapse=!app.collapse;
		if(app.collapse){
			$('.y-sidebar-l1>li').removeClass('open');
		}
		else{
			revertSel();
		}
	});

	// slideClass
	var ySlide=function(ele,flag){
		var l=ele.find('>li').length;
		var h=ele.height();
		if(flag){
			h=0;
		}
		else{
			h=h==0?(32*l+16)+'px':'0';
		}
		ele.css({
			height:h/*,
			transition:'height .3s ease-in-out'*/
		});
	};

	//sidebar li-1
	$('.y-sidebar-l1>li>a').on('click',function(){
		if(!app.collapse){
			$(this).addClass('active').parent().siblings().find('>a').removeClass('active');
			$(this).parent().siblings().removeClass('open');
			// $(this).parent().siblings().find('ul').slideUp();
			ySlide($(this).parent().siblings().find('ul'),true);
			if($(this).next('ul').length){
				// $(this).next().slideToggle();
			 	ySlide($(this).next(),false);
			 	$(this).parent().toggleClass('open');
			}
			else{
				$('.y-sidebar-l1>li>ul>li>a').removeClass('active');
				$(this).addClass('active1');
			}
		}
	});
	//sidebar li-2
	$('.y-sidebar-l1>li>ul>li>a').on('click',function(){
		$('.y-sidebar-l1>li>ul>li>a').removeClass('active');
		$('.y-sidebar-l1>li>a').removeClass('active active1');
		$(this).addClass('active');
		$(this).parent().parent().prev().addClass('active');
	});

	//根据屏幕大小控制collapse
	var collapse=function(){
		if($(window).width()<992){
		 	$('body').addClass('y-sidebar-sm y-collapse');
		 	app.collapse=true;
		 }
		 else{
		 	$('body').removeClass('y-sidebar-sm y-collapse');
		 	app.collapse=false;
		 	revertSel();
		 }
	};
 	collapse();

	$(window).on('resize',function(){
		setTimeout(collapse,350);
	});

	//mouseenter
	$('.y-sidebar-l1>li').on('mouseenter',function(){
		if(app.collapse){
			$('.y-sidebar').addClass('open');
			$(this).find('>ul').addClass('hover');
		}
	});
	//mouseleave
	$('.y-sidebar-l1>li').on('mouseleave',function(){
		if(app.collapse){
			$('.y-sidebar').removeClass('open');
			$(this).find('>ul').removeClass('hover');
		}
	});

	//back to top
	$(window).on('scroll',function(){
    var st=$(this).scrollTop();
    if(st>500){
      $('.y-back-top').addClass('show');
    }
    else{
      $('.y-back-top').removeClass('show');
    }
  });
  $('.y-back-top').hover(function(){
    $(this).addClass('ybt-hover');
  },function(){
    $(this).removeClass('ybt-hover');
  });
  $('.y-back-top').on('click',function(){
    $('body,html').animate({scrollTop:0},200);
    return false;
  });

	console.log(document.body.scrollTop);

	//timer
	Date.prototype.format=function(){
	  var week=['星期日','星期一','星期二','星期三','星期四','星期五','星期六'];
	  var yy=this.getFullYear(),
	      mm=this.getMonth()+1,
	      ww=week[this.getDay()],
	      dd=this.getDate(),
	      hh=this.getHours(),
	      MM=this.getMinutes(),
	      ss=this.getSeconds();
	  var numFormat=function(val){
	    val=val<10?'0'+val:val;
	    return val;
	  };
	  mm=numFormat(mm);
	  dd=numFormat(dd);
	  hh=numFormat(hh);
	  MM=numFormat(MM);
	  ss=numFormat(ss);
	  return{
	    time1:function(){return yy+'-'+mm+'-'+dd;},
	    time2:function(){return yy+'-'+mm+'-'+dd+' '+hh+':'+MM+':'+ss;},
	    time3:function(){return yy+'年'+mm+'月'+dd+'日 '+ww+' '+hh+':'+MM+':'+ss;}
	  }
	};
	var timer=$('.y-timer');
	(function updateTime(){
	  timer.text(new Date().format().time3());
	  setTimeout(updateTime,1000);
	})();

	//fullscreen
	var fs=function(element){
		if(!document.fullscreenElement&&!document.msFullscreenElement&&!document.mozFullscreenElement&&!document.webkitFullscreenElement){
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
			$('.fs').text('退出全屏');
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
			$('.fs').text('全屏测试');
		}
	};
	$('.fs').on('click',function(){
		fs(document.documentElement); //整个页面
		// fs(document.getElementById('element'));
	});

	$('.notify>button').each(function(i){
		$(this).on('click',function(){
			$('.notifyList>div:eq('+i+')').addClass('y-show');
			setTimeout(function(){
				$('.notifyList>div:eq('+i+')').removeClass('y-show');
			},3000);
		})
	});

	$('.load').on('click',function(){
		$('.load').attr('disabled',true);
		$('.y-panel').css('position','relative');
		$('.y-panel').append('<div class="y-loader"><figure class="y-loading"></figure></div>');
		setTimeout(function(){
			$('.y-loader').remove();
			$('.load').attr('disabled',false);
		},3000);
	})

})



















