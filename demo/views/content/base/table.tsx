import * as React from 'react';

// require('es6-promise').polyfill();
// var fetch=require('isomorphic-fetch');

// download
const dlFile=(url,name)=>{
  var a=document.createElement('a');
  a.href=url;
  a.download=name;
  a.style.display='none';
  document.body.appendChild(a);
  a.click();
  a.parentNode.removeChild(a);
};

//对象赋值 深拷贝
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

// check value
const chkVal=(val)=>{
  var reg=/^[\u4E00-\u9FA5A-Za-z0-9_]{2,20}$/;
  return reg.test(val);
};

const pagination=[];
for(let i=0;i<10;i++){
	pagination[i]=i+1;
};

const arrClone=(arr)=>{
  let newArr=[];
  for(let i=0,l=arr.length;i<l;i++){
    if(arr[i] instanceof Array){
      newArr[i]=arrClone(arr[i]);
    }
    else{
      newArr[i]=arr[i];
    }
  }
  return newArr;
};

const obj2arr=(obj)=>{
  var arr=[];
  obj.map((v,k)=>{
    arr[k]=[];
    var keys=Object.keys(v),id='';
    for(var i=0,j=keys.length;i<j;i++){
      if(keys[i]!='__v'){
        if(keys[i]==='_id'){
          id=v[keys[i]];
        }else{
          arr[k].push(v[keys[i]]);
        }
      }
    }
    arr[k].splice(0,0,id);
  })
  
  return arr;
};

let info={
  
};

export interface TableProps {
  thead:any;
  tbody:any;
  noBorder?:boolean;
  checkable?:boolean;
  editable?:boolean;
  deletable?:boolean;
  showHeadbar?:boolean;
  showFootbar?:boolean;
  showToolbar?:boolean;
  moreInfo?:React.MouseEventHandler<any>;
  updateTableData?:React.MouseEventHandler<any>;
  deleteTableData?:React.MouseEventHandler<any>;
  toJson?:React.FormEventHandler<any>;
  addTableData?:React.FormEventHandler<any>;
};

export default class Table extends React.Component<TableProps,any> {
  static auth='yiru';
  state={
    thead:this.props.thead,
    tbArr:obj2arr(this.props.tbody),
    editState:false,
    selected:false,
    pageNum:5,
    rows:[],
  };
  static propTypes={
    thead:React.PropTypes.array,
    tbody:React.PropTypes.array,
    checkable:React.PropTypes.bool,
    editable:React.PropTypes.bool,
    moreInfo:React.PropTypes.func,
    updateTableData:React.PropTypes.func,
    deleteTableData:React.PropTypes.func,
  };
  static defaultProps={
    editState:false,
    selected:false,
    pageNum:5,
  };
  static contextTypes={
    router:React.PropTypes.object
  };
  tmpArr:any;
  // es2015写法
	/*constructor(props){
    super(props);
    this.state=({
      thead:this.props.thead,
      tbArr:obj2arr(this.props.tbody),
    	editState:false,
    	selected:false,
      pageNum:5,
      rows:[],
    });
  };*/

  /*componentWillMount(){
    fetch('/info').then(response => response.json())
      .then(data => {
        this.setState({
          tbArr:obj2arr(data)
        })
      })
      .catch(e => console.log("error", e));
  };*/

  /*componentDidUpdate=()=>{
    // console.log(this.props.thead);
  };*/

  componentWillReceiveProps=(nextProps)=>{
    // console.log(nextProps);
    this.setState({
      thead:nextProps.thead,
      tbArr:obj2arr(nextProps.tbody)
    });
  };

  edit=(v,k)=>{
  	// v.editState=true;
    // this.newTable=this.state.tbody.slice(0);
    const {tbArr}=this.state;
    this.tmpArr=arrClone(tbArr);
    tbArr[k].editState=true;
    this.setState({
      tbArr:tbArr
    })
  };
  save=(v,k)=>{
    
    let val={},th=this.props.thead;
    for(let i=1,l=v.length;i<l;i++){
      /*if(!chkVal(v[i])){
        alert('2-20个有效字符.');
        return false;
      }*/
      if(v[i]==''){
        alert('请填写完整!');
        return false;
      }
      val[th[i]]=v[i];
    }
    // console.log(val);
    let data:any={
      _id:v[0],
      tr:val
    };
    v.editState=false;
    // this.state.tbody=this.newTable.slice(0);
    // this.state.tbody=arrClone(this.newTable);
    // this.newTable[k].editState=false;
  	/*this.setState({
    	tbArr:this.state.tbArr
  	});*/
    /*var url='/table/'+this.props.tableName+'/update';
    var that=this;
    fetch(url,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{'Content-Type':'application/json'},
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        that.props.getTableData(this.props.tableName);
        // fetch(url+'/info').then(response => response.json())
        //   .then(data => {
        //     console.log(data);
        //     this.setState({
        //       tbArr:obj2arr(data.tbody)
        //     })
        //   })
        //   .catch(e => console.log("error", e));
      })
      .catch(e => console.log("删除失败,"+e));*/
    this.props.updateTableData(data);
  };
  delete=(v,k)=>{
    // var that=this;
    /*var url='/table/'+this.props.tableName+'/delete';
    var that=this;
  	fetch(url,{
      method:'POST',
      body:JSON.stringify({_id:v[0]}),
      headers:{'Content-Type':'application/json'},
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        that.props.getTableData(this.props.tableName);
      })
      .catch(e => console.log("删除失败,"+e));*/
    this.props.deleteTableData(v);
  };
  cancel=(v,k)=>{
  	v.editState=false;
    this.setState({
      tbArr:this.tmpArr
    });
    // this.props.getTableData(this.props.tableName);
  };

  select=()=>{
  	this.setState({
    	selected:!this.state.selected
  	})
  };

  getVal=(vk,vsk,e)=>{
    let self=this;
    let tbArr=this.state.tbArr;
    tbArr.map(function(v,k){
      if(vk==k){
        tbArr[k].map(function(sv,sk){
          if(vsk==sk){
            tbArr[k][sk]=e.target.value;
          }
        })
      }
    });
    this.setState({
      tbArr:tbArr
    })
  };

  addRow=()=>{
    const {rows}=this.state;
    let l=rows.length;
    rows.splice(l,0,info);
    this.setState({
      rows:rows
    });
  };
  saveRow=(k)=>{
    let addList:any=document.getElementsByClassName('addtable')[k];
    addList=addList.children;
    let data:any={
      username:addList[0].value,
      password:addList[1].value
    };
    this.props.addTableData(data);

    const {rows}=this.state;
    rows.splice(k,1);
    this.setState({
      rows:rows
    });
  };
  addCancel=(k)=>{
    const {rows}=this.state;
    rows.splice(k,1);
    this.setState({
      rows:rows
    });
  };

  setVal=(k,e)=>{
    // console.log(e.target.value);
    let rows=cloneObj(this.state.rows);
    let name=e.target.name;
    switch(name){
      case 'name':
        rows[k].name=e.target.value;
        this.setState({
          rows:rows
        });
        break;
      case 'password':
        rows[k].password=e.target.value;
        this.setState({
          rows:rows
        });
        break;
    }
  };

  moreInfo=(url)=>{
    this.props.moreInfo(url);
  };

  toJson=(name)=>{
    /*let name=this.props.tableName;
    fetch('/table/'+name+'/toJson').then(response => response.json())
      .then(data => {
        console.log(data);
        if(data.result==='OK'){
          let url=require('../../../models/'+name+'.json');
          console.log(url);
          dlFile(url,name);
          // window.open(url);
          // location.href=url;
        }
      })
      .catch(e => console.log("error", e));*/
    this.props.toJson(name);
  };

  selPagination=(e)=>{
    this.setState({
      pageNum:e.target.innerHTML,
      selected:false
    })
  };

  render() {
  	let that=this;
    // this.state.tbArr.length==0&&(this.state.tbArr=obj2arr(this.props.tbody));
  	const {rows,tbArr,thead,editState,selected,pageNum}=this.state;
    const {editable,deletable,checkable,showHeadbar,showFootbar,showToolbar,noBorder}=this.props;
    const events=Number(!!editable)+Number(!!deletable)+Number(!!checkable);
    const bordered=noBorder?'':'bordered';
    return (
      <div>
        {
          showToolbar&&<div className="ytable-toolbar">
            <div className="yttb">
              {false&&<button className="ybtn ybtn-success y-left" onClick={this.addRow}>添加 <i className="fa fa-plus"></i></button>}
              <button className="ybtn ybtn-info y-right" onClick={this.toJson}>导出为json <i className="fa fa-download"></i></button>
            </div>
            {
              rows.map((v,k)=>{
                return (
                  <div key={`add-${k}`} className="addtable">
                    <input type="text" className="y-input" name='name' placeholder="username" value={v.name} onChange={that.setVal.bind(that,k)} />
                    <input type="password" className="y-input" name='password' placeholder="password" value={v.password} onChange={that.setVal.bind(that,k)} />
                    {/*<span><i className="fa fa-minus-circle"></i></span>*/}
                    <button className="ybtn ybtn-info" onClick={that.saveRow.bind(that,k)}>保存 <i className="fa fa-file-text"></i></button>
                    <button className="ybtn ybtn-warning" onClick={that.addCancel.bind(that,k)}>取消 <i className="fa fa-undo"></i></button>
                  </div>
                )
              })
            }
          </div>
        }
        {
        	showHeadbar&&<div className="ytable-header">
        		<div className="y-select sm y-left">
              <div className="y-input y-inline"><input type='text' value={pageNum} readOnly /></div>
        			<span className="select-icon" onClick={this.select}><i className="fa fa-caret-down"></i></span>
        			<span className="select-tip">{pageNum} 条/页</span>
        			<ul className={'fade-in-up '+(selected?'y-show':'')} onClick={this.selPagination}>
        				<li>5</li>
        				<li>10</li>
        				<li>15</li>
        				<li>20</li>
        				<li>all</li>
        			</ul>
        		</div>
        		<div className="y-search y-right">
              <div className="y-input"><input type='text' placeholder="搜索..." /></div>
        			<span className="select-icon"><i className="fa fa-search"></i></span>
        		</div>
        	</div>
        }
      	<table className={`ytable ytable-${bordered} ytable-striped`}>
	      	<thead>
	      		<tr>
		      		{
		      			thead.map((v,k)=>{
		      				return(
		      					k>0&&<th key={`th${k}`}>{v}</th>
		      				)
		      			})
		      		}
		      		{events>0&&<th colSpan={events}>操作</th>}
	      		</tr>
	      	</thead>
	      	<tbody>
	      		{
	      			tbArr.map((v,k)=>{
	      				return(
									<tr key={`tr${k}`}>
										{
											v.map((sv,sk)=>{
												return(
													sk>0&&<td key={`tr${k}-td${sk}`}>
														{v.editState?<input type="text" value={sv} onChange={that.getVal.bind(that,k,sk)} placeholder={sv} />:sv}
													</td>
												)
											})
										}
                    {checkable&&<td className="edit"><a href="javascript:;" onClick={that.moreInfo.bind(that,v)}><i className="fa fa-info-circle"> 详情</i></a></td>}
										{editable&&(v.editState?<td key={`save${k}`} onClick={that.save.bind(that,v,k)} className="edit"><a href="javascript:;" className="bg-success"><i className="fa fa-file-text"></i> 保存</a></td>:<td key={`edit${k}`} onClick={that.edit.bind(that,v,k)} className="edit"><a href="javascript:;"><i className="fa fa-pencil-square-o"></i> 编辑</a></td>)}
										{deletable&&(v.editState?<td key={`cancel${k}`} onClick={that.cancel.bind(that,v,k)} className="delete"><a href="javascript:;" className="bg-warning"><i className="fa fa-undo"></i> 取消</a></td>:<td key={`delete${k}`} onClick={that.delete.bind(that,v,k)} className="delete"><a href="javascript:;"><i className="fa fa-trash-o"></i> 删除</a></td>)}
									</tr>
	      				)
	      			})
	      		}
	      	</tbody>
      	</table>
      	{
          showFootbar&&<div className="ytable-footer">
        		<div className="pagination">
        			<span>当前显示为 1-5 项，共50项。</span>
        			<ul className="y-right">
        				<li className="disabled">首页</li>
        				<li className="disabled">上一页</li>
        				{
        					(pagination.length>5)?pagination.map((v,k)=>{
        						return(
        							(k<3||k>pagination.length-3)&&<li key={`page${k}`} className={k==0&&'active'||k==2&&'more'}>{k==2?'...':k+1}</li>
        						)
        					}):pagination.map((v,k)=>{
        						return(
        							<li key={`page${k}`}>{k+1}</li>
        						)
        					})
        				}
        				<li>下一页</li>
        				<li>尾页</li>
        			</ul>
        		</div>
      	  </div>
        }
      </div>
    )
  };
}
