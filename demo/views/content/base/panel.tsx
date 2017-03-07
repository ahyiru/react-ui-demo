import * as React from 'react';

import Icon from './icon';

import {fs,loading} from '../../../configs/tools';

const color=['default','info','success','warning','danger'];

export interface PanelProps {
  panelTitle:string;
  pCheckbox?:boolean;
  pSelTheme?:boolean;
  pRefrash?:boolean;
  pCollapse?:boolean;
  pFullscreen?:boolean;
  pClose?:boolean;
  canDrag?:boolean;
  headColor?:string;
};

export default class Panel extends React.Component<PanelProps,any> {
	refs:any;
  static auth='yiru';
  state={
    current:'',
    collapse:true,
    collapseIcon:'minus',
    fsIcon:'expand',
    loadingIcon:'refresh',
    checkBox:true,
    headColor:this.props.headColor||'default',
  };
  static propTypes={
    panelTitle:React.PropTypes.string,
    pCheckbox:React.PropTypes.bool,
    pSelTheme:React.PropTypes.bool,
    pRefrash:React.PropTypes.bool,
    pCollapse:React.PropTypes.bool,
    pFullscreen:React.PropTypes.bool,
    pClose:React.PropTypes.bool,
    canDrag:React.PropTypes.bool,
    headColor:React.PropTypes.string,
  };
  static defaultProps={
    headColor:'default',
  };
	/*constructor(props){
    super(props);
    this.state=({
    	current:'',
    	collapse:true,
    	collapseIcon:'minus',
    	fsIcon:'expand',
    	loadingIcon:'refresh',
    	checkBox:true,
      headColor:this.props.headColor||'default',
    });
  };*/

  componentDidMount=()=>{
  	
  };

  selectTheme=()=>{
  	this.setState({
  		current:this.state.current?'':'y-show'
  	})
  };

  changeTheme=(color)=>{
  	this.setState({
  		current:this.state.current?'':'y-show',
  		headColor:color
  	})
  };

  collapse=()=>{
  	this.setState({
  		collapse:!this.state.collapse,
  		collapseIcon:this.state.collapseIcon=='minus'?'plus':'minus',
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
  	let load=0;
  	clearTimeout(load);
  	loading(this.refs.fs);
  	load=setTimeout(()=>{
  		loading(this.refs.fs);
  	},3000);
  };

  render() {
  	const {current,headColor,collapse,collapseIcon,fsIcon,loadingIcon,checkBox}=this.state;
    const {panelTitle,pCheckbox,pSelTheme,pRefrash,pCollapse,pFullscreen,pClose,canDrag}=this.props;

    const bcolor=checkBox?' bg-info':' bg-default';
    const drag=canDrag?' ydrag':'';
    return (
    	<div ref="fs" className={`y-panel ${headColor}`}>
    		<div className={`y-panel-header${drag}`}>
    			<h4>{panelTitle}</h4>
    			<div className="plugins">
    				{pCheckbox&&<div><input type="checkbox" className="y-switch" checked={checkBox} onChange={this.switchChk} /></div>}
    				{pSelTheme&&<div className="select-theme">
                          <i onClick={this.selectTheme}></i>
                          <ul className={`fade-in-down ${current}`}>
                            {
                              color.map((v,k)=>{
                                return <li key={`color-${k}`} className={`bg-${v}`} onClick={this.changeTheme.bind(this,v)}></li>
                              })
                            }
                          </ul>
                        </div>}
      			{pRefrash&&<div><Icon fa={loadingIcon} click={this.loading} /></div>}
      			{pCollapse&&<div><Icon fa={collapseIcon} click={this.collapse} /></div>}
      			{pFullscreen&&<div><Icon fa={fsIcon} click={this.fullScreen} /></div>}
      			{pClose&&<div><Icon fa="times" click={this.closeItem} /></div>}
      		</div>
    		</div>
    		<div className={`y-panel-body${bcolor}`}>
    			{collapse&&this.props.children}
    		</div>
    	</div>
    );
  }
}
