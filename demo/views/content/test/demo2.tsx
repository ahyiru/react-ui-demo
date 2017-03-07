import * as React from 'react';

require('es6-promise').polyfill();
var fetch=require('isomorphic-fetch');

import Ytables from './yTables';

import Input from '../base/input';

import './data-ui.less';

const cloneObj=(obj)=>{
  var str='',newobj=obj.constructor===Array?[]:{};
  if(typeof obj!=='object'){
    return;
  }
  else{
    for(var i in obj){
      newobj[i]=typeof obj[i]==='object'?cloneObj(obj[i]):obj[i];
    }
  }
  return newobj;
};

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

// check value
const chkVal=(val)=>{
  var reg=/^[\u4E00-\u9FA5A-Za-z0-9_]{1,20}$/;
  return reg.test(val);
};

var sthead=['id','用户名','密码'];

export default class Demo2 extends React.Component<any,any> {
	constructor(props){
    super(props);
    this.state=({
  		head:[],
  		tableName:'users',
  		tbody:[],
  	})
  };
  componentWillMount(){
  	var name=this.state.tableName;
    console.log(name);
  	this.moreInfo(name);
  };
  componentDidMount(){
    
  };
  componentWillUnmount(){
    
  };

  moreInfo=(name)=>{
  	fetch('/table/'+name+'/info',{
  		method:'GET',
  		headers:{'Content-Type':'application/json'},
  	}).then(response => response.json())
		  .then(data => {
		  	console.log(data);
		  	data.head.splice(0,0,'ID');
		  	this.setState({head:data.head,tbody:data.tbody,tableName:name});
		  })
		  .catch(e => console.log("失败,"+e));
  };

  addTableData=()=>{
  	var head=this.state.head.slice(0);
  	head.splice(0,1);
  	var div=document.getElementById('addData');
  	var input=div.getElementsByTagName('input'),val={};
  	console.log(head);
  	for(let i=0,l=head.length;i<l;i++){
  		if(input[i].value==''){
        alert('请填写完整！');
        return false;
      }
  		val[head[i]]=input[i].value;
  	}
  	var name=this.state.tableName;
  	fetch('/table/'+name+'/add',{
  		method:'POST',
  		body:JSON.stringify(val),
  		headers:{'Content-Type':'application/json'},
  	}).then(response => response.json())
		  .then(data => {
		  	console.log(data);
		  	this.setState({tbody:data.tbody});
		  })
		  .catch(e => console.log("失败,"+e));
  };

  render() {
  	// const {data}=this.state;
  	const {head,tbody}=this.state;
  	const that=this;
    return (
    	<div className="data-ui">
    		<div className="y-clearfloat yrow">
    			<div className="ycol-4" id="addData">
    				<h2>表: <i>{this.state.tableName}</i></h2>
	      		<form className="y-form yfv">
	      			{
		      			head.map((v,k)=>{
		      				return (k>0&&<div key={`tt-${k}`} className="yform-group">
										        <label>{v}</label>
										        <Input />
									        </div>
					        			)
		      			})
		      		}
		      		<button type="button" className="ybtn ybtn-info y-right" onClick={this.addTableData}>添加数据</button>
		        </form>
      		</div>
      		<div className="ycol-8">
	      		{/*<table className="ytable ytable-bordered ytable-striped">
	      							      	<thead>
	      							      		<tr>
	      								      		{
	      								      			head.map((v,k)=>{
	      								      				return <th key={`tt-${k}`}>{v}</th>
	      								      			})
	      								      		}
	      							      		</tr>
	      							      	</thead>
	      							      	<tbody>
	      								        {
	      								        	tbody.map((v,k)=>{
	      								        		return(
	      									        		<tr key={`tr-${k}`}>
	      									        			{
	      									        				Object.keys(v).map((sv,sk)=>{
	      									        					return sv!=='__v'&&<td key={`td-${sk}`}>{v[sv]}</td>
	      									        				})
	      									        			}
	      									        		</tr>
	      								        		)
	      								        	})
	      								        }
	      								      </tbody>
	      							      </table>*/}
			      <Ytables yth={head} ytb={tbody} editable={true} deletable={true} showTbar={false} tableName={this.state.tableName} moreInfo={this.moreInfo} />
			    </div>
		    </div>

      </div>
    )
  };
}
