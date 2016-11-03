import * as React from 'react';

require('es6-promise').polyfill();
var fetch=require('isomorphic-fetch');

import Ytables from './yTables';

/*export default class Table extends React.Component<any,any> {

  constructor(props){
    super(props);
  };

  render() {

    return (
      <Ytables yth={tableData.thead} ytb={tableData.tbody} editable={true} />
    );
  }
}*/

const obj2arr=(obj)=>{
	var arr=[];
  var keys=Object.keys(obj);
  for(var i=0,j=keys.length;i<j;i++){
  	if(keys[i]!='__v'){
    	arr.push(obj[keys[i]]);
  	}
  }
  return arr;
};

var sthead=['id','用户名','密码'];

export default class Demo2 extends React.Component<any,any> {
	constructor(props){
    super(props);
    this.state=({
  		data:[],
  		info:{
  			name:'',
  			pwd:''
  		}
  	})
    /*fetch('/info').then(response => response.json())
		  .then(data => {
		  	console.log(data);
		  	this.setState({
		  		data:data
		  	})
		  })
		  .catch(e => console.log("error", e));*/
  };
  componentWillMount(){
  	var that=this;
  	fetch('/info').then(response => response.json())
		  .then(data => {
		  	// console.log(data);
		  	that.setState({
		  		data:data
		  	})
		  })
		  .catch(e => console.log("error", e));
  };
  componentDidMount(){
    /*fetch('/info',{
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
	  });*/
	  /*var that=this;
  	fetch('/info').then(response => response.json())
		  .then(data => {
		  	// console.log(data);
		  	that.setState({
		  		data:data
		  	})
		  })
		  .catch(e => console.log("error", e));*/
  };
  componentWillUnmount(){
    
  };
  addInfo=()=>{
  	var data={
  		username:this.state.info.name,
  		password:this.state.info.pwd
  	};
  	console.log(this.state.info);
  	fetch('/add',{
  		method:'POST',
  		body:JSON.stringify(data),
  		headers:{'Content-Type':'application/json'},
  	}).then(response => response.json())
		  .then(data => {
		  	console.log(data);
		  	fetch('/info').then(response => response.json())
				  .then(data => {
				  	console.log(data);
				  	this.setState({
				  		data:data
				  	})
				  })
				  .catch(e => console.log("error", e));
		  })
		  .catch(e => console.log("添加失败,"+e));
  };
  del=(id)=>{
  	// var that=this;
  	fetch('/delete',{
  		method:'POST',
  		body:JSON.stringify({_id:id}),
  		headers:{'Content-Type':'application/json'},
  	}).then(response => response.json())
		  .then(data => {
		  	console.log(data);
		  	fetch('/info').then(response => response.json())
				  .then(data => {
				  	console.log(data);
				  	this.setState({
				  		data:data
				  	})
				  })
				  .catch(e => console.log("error", e));
		  })
		  .catch(e => console.log("删除失败,"+e));
  };
  getVal=(type,e)=>{
  	if(type=='name'){
  		this.setState({
  			info:{
  				name:e.target.value,
  				pwd:this.state.info.pwd
  			}
  		})
  	}
  	else{
  		this.setState({
  			info:{
  				name:this.state.info.name,
  				pwd:e.target.value
  			}
  		})
  	}
  };
  render() {
  	// const {data}=this.state;
  	const {info}=this.state;
  	const that=this;
    return (
    	<div>
	      <Ytables yth={sthead} ytb={this.state.data} editable={true} />
	      <table>
	      	<thead>
	      		<tr>
	      			<th>id</th>
	      			<th>用户名</th>
	      			<th>密码</th>
	      		</tr>
	      	</thead>
	      	<tbody>
		        {
		        	this.state.data.map((v,k)=>{
		        		return (
		        			<tr key={`test${k}`}>
		        				<td>{v._id}</td>
		        				<td>{v.username}</td>
		        				<td>{v.password}</td>
		        				<td onClick={that.del.bind(that,v._id)}>delete</td>
		        			</tr>
		        		)
		        	})
		        }
		      </tbody>
	      </table>
	      <div>
	        <span>用户名：</span><input type="text" value={info.name} onChange={this.getVal.bind(this,'name')} />
	        <span>密 码：</span><input type="text" value={info.pwd} onChange={this.getVal.bind(this,'pwd')} />
	        <button onClick={this.addInfo}>add</button>
	      </div>
      </div>
    )
  };
}
