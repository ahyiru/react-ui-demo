import React, { Component } from 'react';

import EventEmitter from '../../configs/eventEmitter';

export default class Home extends Component {

	constructor(props){
    super(props);
    this.state=({
    	current:'',
    	changeTo:'default',
    	collapse:200,
    	collapseIcon:'minus',
    	fsIcon:'expand',
    	checkBox:true
    })
  }

  selectTheme=()=>{
  	this.setState({
  		current:this.state.current?'':'y-show'
  	})
  }

  changeTheme=(color)=>{
  	this.setState({
  		current:this.state.current?'':'y-show',
  		changeTo:color
  	})
  }

  collapse=()=>{
  	this.setState({
  		collapse:this.state.collapse?0:200,
  		collapseIcon:this.state.collapseIcon=='minus'?'plus':'minus'
  	})
  }

  fullScreen=()=>{
  	this.setState({
  		// current:this.state.current?'':'y-show',
  		fsIcon:this.state.fsIcon=='expand'?'compress':'expand'
  	})
  }

  closeItem=()=>{
  	this.setState({
  		
  	})
  }

  switchChk=()=>{
  	console.log(this.state.checkBox);
  	this.setState({
  		checkBox:!this.state.checkBox
  	})
  }

  showNotify=(direction)=>{
  	EventEmitter.dispatch('subNotify',direction);
  }

  render() {

  	const {current,changeTo,collapse,collapseIcon,fsIcon,checkBox}=this.state;

    return (
    	<div className="y-items">
	    	<div className="y-item">
	      	<h2>button</h2>
	      	<div className="y-items">
		      	<div className="y-item">
			      	<button className="ybtn ybtn-default mr">default</button>
		          <button className="ybtn ybtn-success mr">success</button>
		          <button className="ybtn ybtn-info mr">info</button>
		          <button className="ybtn ybtn-warning mr">warning</button>
		          <button className="ybtn ybtn-danger">danger</button>
			      </div>
			      <div className="y-item">
			      	<button className="ybtn ybtn-default ybtn-sm mr">default samll</button>
		          <button className="ybtn ybtn-success ybtn-sm mr">success samll</button>
		          <button className="ybtn ybtn-info ybtn-sm mr">info samll</button>
		          <button className="ybtn ybtn-warning ybtn-lg mr">warning large</button>
		          <button className="ybtn ybtn-danger ybtn-lg">danger large</button>
			      </div>
			      <div className="y-item">
		          <button className="ybtn ybtn-info ybtn-block mb">info block</button>
		          <button className="ybtn ybtn-warning ybtn-block mb">warning block</button>
		          <button className="ybtn ybtn-danger ybtn-block">danger block</button>
			      </div>
		      </div>
	      </div>
	      <div className="y-item">
	      	<h2>panel</h2>
	      	<div className={'y-panel '+changeTo}>
	      		<div className="y-panel-header">
	      			<h4>panel标题栏</h4>
	      			<div className="plugins">
	      				<section className="y-left"><input type="checkbox" className="y-switch" checked={checkBox} onChange={this.switchChk} /></section>
	      				<div className="select-theme">
	      					<i onClick={this.selectTheme}></i>
	      					<ul className={'fade-in-down '+current}>
	      						<li className="bg-default" onClick={this.changeTheme.bind(this,'default')}></li>
	      						<li className="bg-success" onClick={this.changeTheme.bind(this,'success')}></li>
	      						<li className="bg-info" onClick={this.changeTheme.bind(this,'info')}></li>
	      						<li className="bg-warning" onClick={this.changeTheme.bind(this,'warning')}></li>
	      						<li className="bg-danger" onClick={this.changeTheme.bind(this,'danger')}></li>
	      					</ul>
	      				</div> 
		      			<div><i className={'fa fa-'+collapseIcon} onClick={this.collapse}></i></div>
		      			<div><i className={'fa fa-'+fsIcon} onClick={this.fullScreen}></i></div>
		      			<div><i className="fa fa-times" onClick={this.closeItem}></i></div>
		      		</div>
	      		</div>
	      		<div className={'y-panel-body '+(checkBox?'bg-info':'bg-default')} style={{height:collapse}}>
	      			
	      		</div>
	      	</div>
	      </div>
	      <div className="y-item">
	      	<h2>notification</h2>
          <button className="ybtn ybtn-success mr" onClick={this.showNotify.bind(this,'top-left')}>左上</button>
          <button className="ybtn ybtn-warning mr" onClick={this.showNotify.bind(this,'top-middle')}>中上</button>
          <button className="ybtn ybtn-danger mr" onClick={this.showNotify.bind(this,'top-right')}>右上</button>
          <button className="ybtn ybtn-info" onClick={this.showNotify.bind(this,'bottom-right')}>右下</button>
	      </div>
	      <div className="y-item">
	      	<h2>list</h2>
	      </div>
	      <div className="y-item">
	      	<h2>table</h2>
	      </div>
	      <div className="y-item">
	      	<h2>carousel</h2>
	      </div>
	      <div className="y-item">
	      	<h2>form</h2>
	      </div>
      </div>
    );
  }
}
