import * as React from 'react';

import EventEmitter from '../../configs/eventEmitter';

import {addClass,removeClass} from '../../configs/tools';

import Ydnd from './ydnd';
import Ypanel from './ypanel';

import dnd from './ydrag';

let themePkg=['default-theme','theme1','theme2','theme3','theme4','stheme1','stheme2','stheme3','stheme4','stheme5','ltheme1','ltheme2','ltheme3','ltheme4'];

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
};
let dragPanel={
  title1:'可拖放panel1',
  title2:'可拖放panel2',
  defaultTheme:'',
  plugins:{
    pCheckbox:false,
    pSelTheme:false,
    pRefrash:false,
    pCollapse:false,
    pFullscreen:false,
    pClose:false
  }
};

export default class Home extends React.Component<any,any> {
	constructor(props){
    super(props);
  };

  componentDidMount(){
    dnd.init();
  	// require('./ydrag');
    /*let ydnd=require('./ydrag').default;
    ydnd();*/
  };
  componentWillUnmount(){
  	dnd.distroy();
  };

  changeTheme=(theme)=>{
  	themePkg.map(function(v,k){
  		removeClass(document.body,v);
  		if(theme==v){
  			addClass(document.body,v);
  			try{
  				localStorage.setItem('theme',v);
				}
				catch(e){
					console.log('你处于无痕模式!');
					return false;
				}
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
	      	<button className="ybtn ybtn-default mr" onClick={this.changeTheme.bind(this,'default-theme')}>默认</button>
	      	<button className="ybtn ybtn-success mr" onClick={this.changeTheme.bind(this,'theme1')}>清新</button>
          <button className="ybtn ybtn-warning mr" onClick={this.changeTheme.bind(this,'theme2')}>淡雅</button>
          <button className="ybtn ybtn-danger mr" onClick={this.changeTheme.bind(this,'theme3')}>浅墨</button>
          <button className="ybtn ybtn-info" onClick={this.changeTheme.bind(this,'theme4')}>中国风</button>
	      </div>
	      <div className="y-item">
	      	<h2>主题2</h2>
          <button className="ybtn ybtn-default mr" onClick={this.changeTheme.bind(this,'stheme1')}>stheme1</button>
          <button className="ybtn ybtn-success mr" onClick={this.changeTheme.bind(this,'stheme2')}>stheme2</button>
          <button className="ybtn ybtn-info mr" onClick={this.changeTheme.bind(this,'stheme3')}>stheme3</button>
          <button className="ybtn ybtn-warning mr" onClick={this.changeTheme.bind(this,'stheme4')}>stheme4</button>
          <button className="ybtn ybtn-danger" onClick={this.changeTheme.bind(this,'stheme5')}>stheme5</button>
	      </div>
	      <div className="y-item">
	      	<h2>主题3</h2>
          <button className="ybtn ybtn-default mr" onClick={this.changeTheme.bind(this,'ltheme1')}>ltheme1</button>
          <button className="ybtn ybtn-success mr" onClick={this.changeTheme.bind(this,'ltheme2')}>ltheme2</button>
          <button className="ybtn ybtn-info mr" onClick={this.changeTheme.bind(this,'ltheme3')}>ltheme3</button>
          <button className="ybtn ybtn-warning mr" onClick={this.changeTheme.bind(this,'ltheme4')}>ltheme4</button>
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
	      	<Ydnd>
            <Ypanel canDrag={false} panelTitle={panel.title} defaultTheme={panel.defaultTheme} {...panel.plugins} />
          </Ydnd>
	      </div>
	      <div className="y-item">
	      	<h2>可拖放panel</h2>
	      	<div>
		      	<Ydnd>
	            <Ypanel canDrag={true} panelTitle={dragPanel.title1} defaultTheme={dragPanel.defaultTheme} {...dragPanel.plugins} />
	          </Ydnd>
	          <Ydnd>
	            <Ypanel canDrag={true} panelTitle={dragPanel.title2} defaultTheme={dragPanel.defaultTheme} {...dragPanel.plugins} />
	          </Ydnd>
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
