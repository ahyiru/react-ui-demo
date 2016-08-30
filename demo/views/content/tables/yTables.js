import React, { Component } from 'react';

import {tableData} from '../../../models/models';

const yth=tableData.thead;
const ytb=tableData.tbody;

const pagination=[];
for(var i=0;i<10;i++){
	pagination[i]=i+1;
}

export default class yTables extends Component {

	constructor(props){
    super(props);
    this.state=({
    	editable:true,
    	editState:false,
    	selected:false
    })
  }

  edit=(v,k)=>{
  	v.editState=true;
  	this.setState({
    	ytb:ytb
  	})
  }
  save=(v,k)=>{
  	v.editState=false;
  	this.setState({
    	ytb:ytb
  	})
  }
  delete=(v,k)=>{
  	alert('sure?');
  }
  cancel=(v,k)=>{
  	v.editState=false;
  	this.setState({
    	ytb:ytb
  	})
  }

  select=()=>{
  	this.setState({
    	selected:!this.state.selected
  	})
  }

  render() {
  	var that=this;
  	const {editable,editState,selected}=this.state;
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
		      			yth.map(function(v,k){
		      				return(
		      					<th key={'th'+k}>{v}</th>
		      				)
		      			})
		      		}
		      		{editable&&<th colSpan="2">操作</th>}
	      		</tr>
	      	</thead>
	      	<tbody>
	      		{
	      			ytb.map(function(v,k){
	      				return(
									<tr key={'tr'+k}>
										{
											v.map(function(sv,sk){
												return(
													<td key={'tr'+k+',td'+sk}>
														{v.editState?<input type="text" placeholder={sv} />:sv}
													</td>
												)
											})
										}
										{editable&&v.editState?<td key={'save'+k} onClick={that.save.bind(that,v,k)} className="edit"><a href="javascript:;" className="bg-success"><i className="fa fa-file-text"></i> 保存</a></td>:<td key={'edit'+k} onClick={that.edit.bind(that,v,k)} className="edit"><a href="javascript:;"><i className="fa fa-pencil-square-o"></i> 编辑</a></td>}
										{editable&&v.editState?<td key={'cancel'+k} onClick={that.cancel.bind(that,v,k)} className="delete"><a href="javascript:;" className="bg-warning"><i className="fa fa-undo"></i> 取消</a></td>:<td key={'delete'+k} onClick={that.delete.bind(that,v,k)} className="delete"><a href="javascript:;"><i className="fa fa-trash-o"></i> 删除</a></td>}
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
      					(pagination.length>5)?pagination.map(function(v,k){
      						return(
      							(k<3||k>pagination.length-3)&&<li key={'page'+k} className={k==0&&'active'||k==2&&'more'}>{k==2?'...':k+1}</li>
      						)
      					}):pagination.map(function(v,k){
      						return(
      							<li key={'page'+k}>{k+1}</li>
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
