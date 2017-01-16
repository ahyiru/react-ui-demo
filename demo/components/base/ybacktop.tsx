import * as React from 'react';

export default class YbackTop extends React.Component<any,any> {

	constructor(props){
    super(props);
    this.state=({
      hover:''
    });
    
    window.addEventListener('scroll',this.yscroll,false);
  };

  //scroll
  yscroll=()=>{
    let show='';
    let st=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
    if(st>500){
      show='y-show';
    }
    else{
      show='';
    }
    this.setState({
      show:show
    });
  };

  componentDidMount=()=>{
    
  };

  componentWillUnmount=()=>{
    window.removeEventListener('scroll',this.yscroll,false);
  };

  toTop=()=>{
    if(document.documentElement.scrollTop){
      let timer=setInterval(function(){
        if(document.documentElement.scrollTop<=0){
          document.documentElement.scrollTop=0;
          clearInterval(timer);
          return true;
        }
        document.documentElement.scrollTop-=100;
      },1);
    }
    else{
      let timer=setInterval(function(){
        if(document.body.scrollTop<=0){
          document.body.scrollTop=0;
          clearInterval(timer);
          return true;
        }
        document.body.scrollTop-=100;
      },1);
    }
  };

  mouseEnter=()=>{
    this.setState({
      hover:'ybt-hover'
    })
  };
  mouseLeave=()=>{
    this.setState({
      hover:''
    })
  };

  render() {
  	const {show,hover}=this.state;
    return (
      <div className={`y-back-top ${show} ${hover}`} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.toTop}>
        <i className="fa fa-angle-up"></i>
        <span>返回顶部</span>
      </div>
    );
  }
}
