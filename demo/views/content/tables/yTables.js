import React, { Component } from 'react';

import {tableData} from '../../../models/models';

const yth=tableData.thead;
const ytb=tableData.tbody;

export default class yTables extends Component {

	constructor(props){
    super(props);
    this.state=({
    	editable:true,
    	editState:false
    })
  }

  edit=(v,k)=>{
  	this.setState({
  		editable:true,
    	editState:!this.state.editState
  	})
  }

  render() {
  	var that=this;
  	const {editable,editState}=this.state;
    return (
      <div>
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
		      		{editable&&<th key="edit">编辑</th>}
		      		{editable&&<th key="delete">删除</th>}
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
														{editState?<input type="text" value={sv} />:sv}
													</td>
												)
											})
										}
										{editable&&<th key="edit" onClick={that.edit.bind(that,v,k)}><a href="javascript:;">编辑</a></th>}
										{editable&&<th key="delete"><a href="javascript:;">删除</a></th>}
									</tr>
	      				)
	      			})
	      		}
	      	</tbody>
      	</table>
      </div>
    )
  };
}
