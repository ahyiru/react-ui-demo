import * as React from 'react';

import {fs} from '../../configs/tools';

export default class Ypanel extends React.Component<any,any> {
	refs:any;
	constructor(props){
    super(props);
    this.state=({
    	current:'',
    	changeTo:this.props.defaultTheme||'default',
    	collapse:200,
    	collapseIcon:'minus',
    	fsIcon:'expand',
    	loadingIcon:'refresh',
    	checkBox:true
    });
  };

  componentDidMount(){
  	
  };

  selectTheme=()=>{
  	this.setState({
  		current:this.state.current?'':'y-show'
  	})
  };

  changeTheme=(color)=>{
  	this.setState({
  		current:this.state.current?'':'y-show',
  		changeTo:color
  	})
  };

  collapse=()=>{
  	this.setState({
  		collapse:this.state.collapse?0:200,
  		collapseIcon:this.state.collapseIcon=='minus'?'plus':'minus'
  	})
  };

  fullScreen=()=>{
  	fs(this.refs.fs);
  	this.setState({
  		fsIcon:this.state.fsIcon=='expand'?'compress':'expand'
  	})
  };

  closeItem=()=>{
  	this.setState({
  		
  	})
  };

  switchChk=()=>{
  	this.setState({
  		checkBox:!this.state.checkBox
  	})
  };

  loading=()=>{
  	let load=0,that=this;
  	clearTimeout(load);
  	this.setState({
  		isLoading:true
  	});
  	load=setTimeout(()=>{
  		that.setState({
	  		isLoading:false
	  	});
  	},3000);
  };

  render() {
  	const {current,changeTo,collapse,collapseIcon,fsIcon,loadingIcon,isLoading,checkBox}=this.state;
    const {panelTitle,pCheckbox,pSelTheme,pRefrash,pCollapse,pFullscreen,pClose}=this.props;
    return (
    	<div ref="fs" className={`y-panel ydrop ${changeTo}`}>
    		<div className="y-panel-header ydrag">
    			<h4>{panelTitle}</h4>
    			<div className="plugins">
    				{pCheckbox?<div><input type="checkbox" className="y-switch" checked={checkBox} onChange={this.switchChk} /></div>:''}
    				{pSelTheme?<div className="select-theme">
                          <i onClick={this.selectTheme}></i>
                          <ul className={`fade-in-down ${current}`}>
                            <li className="bg-default" onClick={this.changeTheme.bind(this,'default')}></li>
                            <li className="bg-success" onClick={this.changeTheme.bind(this,'success')}></li>
                            <li className="bg-info" onClick={this.changeTheme.bind(this,'info')}></li>
                            <li className="bg-warning" onClick={this.changeTheme.bind(this,'warning')}></li>
                            <li className="bg-danger" onClick={this.changeTheme.bind(this,'danger')}></li>
                          </ul>
                        </div>:''}
      			{pRefrash?<div><i className={`fa fa-${loadingIcon}`} onClick={this.loading}></i></div>:''}
      			{pCollapse?<div><i className={`fa fa-${collapseIcon}`} onClick={this.collapse}></i></div>:''}
      			{pFullscreen?<div><i className={`fa fa-${fsIcon}`} onClick={this.fullScreen}></i></div>:''}
      			{pClose?<div><i className="fa fa-times" onClick={this.closeItem}></i></div>:''}
      		</div>
    		</div>
    		<div className={'y-panel-body '+(checkBox?'bg-info':'bg-default')} style={{height:collapse}}>
    			
    		</div>
    		{isLoading?<div className="y-loader"><figure className="y-loading"></figure></div>:''}
    	</div>
    );
  }
}
