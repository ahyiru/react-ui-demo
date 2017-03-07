import * as React from 'react';
import {backTop} from '../../tools/dom-tools';

export default class BackTop extends React.Component<any,any> {
  state={show:false};
  $scroll=()=>{
    let show=false;
    let st=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
    if(st>500){
      show=true;
    }else{
      show=false;
    }
    this.setState({
      show:show
    });
  };
  componentDidMount=()=>{
    window.addEventListener('scroll',this.$scroll,false);
  };
  componentWillUnmount=()=>{
    window.removeEventListener('scroll',this.$scroll,false);
  };
  backToTop=()=>{
    backTop();
  };
  render() {
  	const {show}=this.state;
    return (
      show&&<div className="y-back-top" onClick={this.backToTop}>
        <i className="fa fa-angle-up"></i>
        <span>返回顶部</span>
      </div>
    );
  }
}
