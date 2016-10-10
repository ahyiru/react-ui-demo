import * as React from 'react';

// import {tableData} from '../../../models/models';

/*const yth:any[]=tableData.thead;
const ytb:any[]=tableData.tbody;*/

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
}

export default class Ytables extends React.Component<any,any> {
  oldTable:any[];
  newTable:any[];
	constructor(props){
    super(props);
    this.oldTable=[];
    this.newTable=[];
    this.state=({
      yth:this.props.yth,
      ytb:this.props.ytb,
    	editable:this.props.editable,
    	editState:false,
    	selected:false
    })
  }

  edit=(v,k)=>{
  	// v.editState=true;
    // this.newTable=this.state.ytb.slice(0);
    this.oldTable=arrClone(this.state.ytb);
    this.newTable=arrClone(this.state.ytb);
    this.newTable[k].editState=true;
    this.setState({
      ytb:this.newTable
    })
  }
  save=(v,k)=>{
    v.editState=false;
    // this.state.ytb=this.newTable.slice(0);
    // this.state.ytb=arrClone(this.newTable);
    // this.newTable[k].editState=false;
  	this.setState({
    	ytb:this.newTable
  	})
  }
  delete=(v,k)=>{
  	// alert('sure?');
    this.state.ytb.splice(k,1);
    this.setState({
      ytb:this.state.ytb
    })
  }
  cancel=(v,k)=>{
  	v.editState=false;
  	this.setState({
    	ytb:this.oldTable
  	})
  }

  select=()=>{
  	this.setState({
    	selected:!this.state.selected
  	})
  }

  getVal=(vk,vsk,e)=>{
    /*console.log(vk);
    console.log(vsk);
    console.log(e.target.value);*/
    var self=this;
    self.newTable.map(function(v,k){
      if(vk==k){
        self.newTable[k].map(function(sv,sk){
          if(vsk==sk){
            self.newTable[k][sk]=e.target.value;
          }
        })
      }
    });
    this.setState({
      ytb:this.newTable
    })
  }

  render() {
  	let that=this;
  	const {yth,ytb,editable,editState,selected}=this.state;
    return (
      <div>
      	<div className="ytable-header">
      		<div className="y-select sm y-left">
      			<input type='text' className="y-input" defaultValue="5" />
      			<span className="select-icon" onClick={this.select}><i className="fa fa-caret-down"></i></span>
      			<span className="select-tip">5 条/页</span>
      			<ul className={'fade-in-up '+(selected?'y-show':'')}>
      				<li>5</li>
      				<li>10</li>
      				<li>15</li>
      				<li>20</li>
      				<li>all</li>
      			</ul>
      		</div>
      		<div className="y-search y-right">
      			<input type='text' className="y-input" placeholder="搜索..." />
      			<span className="select-icon"><i className="fa fa-search"></i></span>
      		</div>
      	</div>
      	<table className="ytable ytable-bordered ytable-striped">
	      	<thead>
	      		<tr>
		      		{
		      			yth.map((v,k)=>{
		      				return(
		      					<th key={`th${k}`}>{v}</th>
		      				)
		      			})
		      		}
		      		{editable&&<th colSpan={2}>操作</th>}
	      		</tr>
	      	</thead>
	      	<tbody>
	      		{
	      			ytb.map((v,k)=>{
	      				return(
									<tr key={`tr${k}`}>
										{
											v.map((sv,sk)=>{
												return(
													<td key={`tr${k}-td${sk}`}>
														{v.editState?<input type="text" value={sv} onChange={that.getVal.bind(that,k,sk)} placeholder={sv} />:sv}
													</td>
												)
											})
										}
										{editable&&(v.editState?<td key={`save${k}`} onClick={that.save.bind(that,v,k)} className="edit"><a href="javascript:;" className="bg-success"><i className="fa fa-file-text"></i> 保存</a></td>:<td key={`edit${k}`} onClick={that.edit.bind(that,v,k)} className="edit"><a href="javascript:;"><i className="fa fa-pencil-square-o"></i> 编辑</a></td>)}
										{editable&&(v.editState?<td key={`cancel${k}`} onClick={that.cancel.bind(that,v,k)} className="delete"><a href="javascript:;" className="bg-warning"><i className="fa fa-undo"></i> 取消</a></td>:<td key={`delete${k}`} onClick={that.delete.bind(that,v,k)} className="delete"><a href="javascript:;"><i className="fa fa-trash-o"></i> 删除</a></td>)}
									</tr>
	      				)
	      			})
	      		}
	      	</tbody>
      	</table>
      	<div className="ytable-footer">
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
      </div>
    )
  };
}
