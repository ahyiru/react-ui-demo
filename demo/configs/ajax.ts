export const yajax=(opt)=>{
  opt=opt||{};
  opt.method=opt.method.toUpperCase()||'GET';
  opt.url=opt.url||'';
  opt.data=opt.data||null;
  opt.async=opt.ansync||true;
  opt.dataType=opt.dataType||'text';
  opt.contentType=opt.contentType||'application/x-www-form-urlencoded';
  opt.beforeSend=opt.beforeSend||'function(){}';
  opt.success=opt.success||function(){};
  opt.error=opt.error||function(){};
  opt.beforeSend();

  let xhr=null;
  XMLHttpRequest?(xhr=new XMLHttpRequest()):(xhr=new ActiveXObject('Microsoft.XMLHTTP'));

  let params=[];
  for(let param in opt.data){
    params.push(param+'='+opt.data[param]);
  }
  let data=params.join('&');

  if(opt.method.toUpperCase()==='GET'){
    xhr.open(opt.method,opt.url+'?'+data,opt.async);
    xhr.send(null);
  }else if(opt.method.toUpperCase()==='POST'){
    xhr.open(opt.method,opt.url,opt.async);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded;charset=utf-8');
    xhr.send(data);
  }
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4){
      if(xhr.status>=200&&xhr.status<300||xhr.status==304){
        if(opt.success){
          opt.success(xhr.responseText);
        }
      }else{
         if(opt.error){
           opt.error(xhr.status);
         }
      }
    }
  };
};





