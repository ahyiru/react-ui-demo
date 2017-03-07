require('es6-promise').polyfill();
const fetch=require('isomorphic-fetch');
export const $fetch={
  get:(url,headers=null,cors=null)=>{
    return fetch(url,{
      method:'GET',
      cors:cors||'no-cors',
      headers:headers||{'Content-Type':'application/json'},
    }).then(response => response.json())
    /*.then((data)=>{
      return data;
    })
    .catch((err)=>{
      return err;
    });*/
  },
  post:(url,data,headers=null,cors=null)=>{
    return fetch(url,{
      method:'POST',
      body:JSON.stringify(data),
      cors:cors||'no-cors',
      headers:headers||{'Content-Type':'application/json'},
    }).then(response => response.json())
    /*.then((data)=>{
      return data;
    })
    .catch((err)=>{
      return err;
    });*/
  },
  put:(url,headers=null,cors=null)=>{
    return fetch(url,{
      method:'PUT',
      cors:cors||'no-cors',
      headers:headers||{'Content-Type':'application/json'},
    }).then(response => response.json())
    /*.then((data)=>{
      return data;
    })
    .catch((err)=>{
      return err;
    });*/
  },
};





