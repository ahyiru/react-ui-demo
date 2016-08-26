export const yFetch=()=>{
  fetch('/api/test',{
    method:'get',// 默认
    cors:'no-cors',// 默认
    headers:{
      'Content-Type':'application/x-www-form-urlencoded'
    }
  })
  .then((res)=>{
    console.log(res);
    return res.json();
  })
  .then((data)=>{
    console.log(data);
  })
  .catch((err)=>{
    console.log(err);
  });
};
