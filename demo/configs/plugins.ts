
var yPlugins={
  version:'1.0',
  auth:'yiru',
  dateFormat:function(){
    var week=['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
    var yy=this.getFullYear(),
        mm=this.getMonth()+1,
        ww=week[this.getDay()-1],
        dd=this.getDate(),
        hh=this.getHours(),
        MM=this.getMinutes(),
        ss=this.getSeconds();
    mm=mm<10?'0'+mm:mm;
    dd=dd<10?'0'+dd:dd;
    hh=hh<10?'0'+hh:hh;
    MM=MM<10?'0'+MM:MM;
    ss=ss<10?'0'+ss:ss;
    return{
      day:function(){return yy+'-'+mm+'-'+dd;},
      time:function(){return yy+'-'+mm+'-'+dd+' '+hh+':'+MM+':'+ss;},
      ctime:function(){return yy+'年'+mm+'月'+dd+'日 '+ww+' '+hh+':'+MM+':'+ss;}
    }
  },
  formVerify:function(){
    this.verify={
      required: [
        /[\S]+/
        ,'必填项不能为空'
      ]
      ,phone: [
        /^1\d{10}$/
        ,'请输入正确的手机号'
      ]
      ,email: [
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
        ,'邮箱格式不正确'
      ]
      ,yemail: [
        /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
        ,'邮箱格式不正确'
      ]
      //  密码长度为8-20个字符，并且至少包含数字、大小写字母中的两种，不含特殊字符！
      ,ypwd: [
        /^(?![^a-zA-Z]+$)(?!\D+$)[0-9a-zA-Z]{8,20}$/
        ,'密码式不正确'
      ]
      ,url: [
        /(^#)|(^http(s*):\/\/[^\s]+\.[^\s]+)/
        ,'链接格式不正确'
      ]
      ,number: [
        /^\d+$/
        ,'只能填写数字'
      ]
      ,date: [
        /^(\d{4})[-\/](\d{1}|0\d{1}|1[0-2])([-\/](\d{1}|0\d{1}|[1-2][0-9]|3[0-1]))*$/
        ,'日期格式不正确'
      ]
      ,identity: [
        /(^\d{15}$)|(^\d{17}(x|X|\d)$)/
        ,'请输入正确的身份证号'
      ]
    }
  },
  citySelect:function(){
    // 
  },
  imgLazyload:function(url,callback){
    //图片预加载 
    var img=new Image();
    img.src=url; 
    if(img.complete){
      return callback(img);
    }
    img.onload=function(){
      img.onload=null;
      callback(img);
      // document.location.href = strData;
    };
    img.onerror=function(e){
      img.onerror=null;
      console.log('load error:'+e);
    };
  },
  trim:function(){  //去掉两边的空格
    return this.replace(/^\s+|\s+$/g,'');
  }
}
;












