import * as React from 'react';

import EventEmitter from '../../configs/eventEmitter';

import {addClass,removeClass} from '../../configs/tools';

import Ydnd from './ydnd';
import Ypanel from './ypanel';

let themePkg=['default','theme1','theme2','theme3','theme4'];

let panel={
  title:'panel标题栏',
  defaultTheme:'',
  plugins:{
    pCheckbox:true,
    pSelTheme:true,
    pRefrash:true,
    pCollapse:true,
    pFullscreen:true,
    pClose:true
  }
}

export default class Home extends React.Component<any,any> {
	constructor(props){
    super(props);
  };

  componentDidMount(){
    
  };

  changeTheme=(theme)=>{
  	themePkg.map(function(v,k){
  		removeClass(document.body,v);
  		if(theme==v){
  			addClass(document.body,v);
  		}
  	});
  };

  showNotify=(direction)=>{
  	EventEmitter.dispatch('subNotify',direction);
  };

  render() {
    return (
    	<div className="y-items">
    		<div className="y-item">
	      	<h2>主题</h2>
	      	<button className="ybtn ybtn-default mr" onClick={this.changeTheme.bind(this,'')}>默认</button>
	      	<button className="ybtn ybtn-success mr" onClick={this.changeTheme.bind(this,'theme1')}>清新</button>
          <button className="ybtn ybtn-warning mr" onClick={this.changeTheme.bind(this,'theme2')}>淡雅</button>
          <button className="ybtn ybtn-danger mr" onClick={this.changeTheme.bind(this,'theme3')}>浅墨</button>
          <button className="ybtn ybtn-info" onClick={this.changeTheme.bind(this,'theme4')}>中国风</button>
	      </div>
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
	      	<Ydnd canDrop={false}>
            <Ypanel panelTitle={panel.title} defaultTheme={panel.defaultTheme} {...panel.plugins} />
          </Ydnd>
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
