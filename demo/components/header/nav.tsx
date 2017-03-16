import * as React from 'react';

import DropDown from './dropdown';

import {removeClass,toggleClass,$notify} from '../../tools/dom-tools';

import {$emitter,$storage} from '../../tools/yiru-tools';

import {clearAll} from '../../servers/storage';

export interface NavProps {
  dropList?:any;
  login?:any;
  hideRightTogbar?:boolean;
};

export default class Nav extends React.Component<NavProps,any> {
  state={
    leftList:this.props.dropList.leftList,
    rightList:this.props.dropList.rightList,
    searchFlag:this.props.dropList.searchFlag,
  };
  static propTypes={
    dropList:React.PropTypes.object,
    login:React.PropTypes.object,
    hideRightTogbar:React.PropTypes.bool,
  };
  static defaultProps={
    dropList:null,
    login:null,
    hideRightTogbar:false,
  };

  hideNav=(e)=>{
    // e.stopPropagation();
    let leftList=this.state.leftList;
    let rightList=this.state.rightList;
    leftList.map((v,k)=>{
      v.open='';
    });
    rightList.map((v,k)=>{
      v.open='';
    });
    this.setState({
      leftList:leftList,
      rightList:rightList
    });
  };

  componentDidMount=()=>{
    window.addEventListener('click',this.hideNav,false);
  };

  componentWillUnmount=()=>{
    window.removeEventListener('click',this.hideNav,false);
  };

  dropDown=(cur)=>{
    let leftList=this.state.leftList;
    let rightList=this.state.rightList;
    leftList.map((v,k)=>{
      if(v.name==cur){
        v.open=v.open?'':'open';
      }
      else{
        v.open='';
      }
    });
    rightList.map((v,k)=>{
      if(v.name==cur){
        v.open=v.open?'':'open';
      }
      else{
        v.open='';
      }
    });
    
    this.setState({
      leftList:leftList,
      rightList:rightList
    });
    removeClass(document.getElementsByClassName('right-bar')[0],'open');
  };

  sideBar=()=>{
    let body=document.body;
    toggleClass(body,'y-collapse');
    let collapse=$storage.get('collapse')||'';
    if(collapse){
      $storage.set('collapse','');
    }else{
      $storage.set('collapse','y-collapse');
    }
  };

  rightBar=()=>{
    toggleClass(document.getElementsByClassName('right-bar')[0],'open');
  };

  clearCache=()=>{
    clearAll();
    // $emitter.dispatch('subNotify','成功清除全部缓存！');
    $notify.start({txt:'缓存成功清除！'});
    setTimeout(function(){
      $notify.destroy();
    },3000);
  };

  handleClick=(v)=>{
    if(v.name==='清缓'){
      this.clearCache();
    }
  };

  render() {
    const {leftList,rightList,searchFlag}=this.state;
    const {login}=this.props;
    return (
      <nav className="y-nav">
        <article className="y-nav-wrap y-nav-left">
          <ul className="y-left">
            <li className="sidebar-collapse" onClick={this.sideBar}>
              <a href="javascript:;">
                <i className="fa fa-outdent"></i>
              </a>
            </li>
            {
              leftList.map((v,k)=>{
                return(
                  v.items?
                  <DropDown key={`leftList${k}`} name={v.name} icon={v.icon} animate={v.animate} msg={v.msg} open={v.open} items={v.items} getCur={this.dropDown} />
                  :<li key={`leftList${k}`} onClick={this.handleClick.bind(this,v)}>
                    <a href={v.href}>
                      {v.icon&&<i className={`fa fa-${v.icon}`}></i>}
                      {v.name}
                    </a>
                  </li>
                )
              })
            }
            {
              searchFlag&&
                <li className="y-search">
                  <input type="text" placeholder="搜索..." />
                  <i className="fa fa-search"></i>
                </li>
            }
          </ul>
        </article>
        <article className="y-nav-wrap y-nav-right">
          {
            !login?
            <ul>
              {
                rightList.map((v,k)=>{
                  return(
                    v.items?
                    <DropDown key={`rightList${k}`} name={v.name} icon={v.icon} img={v.img} animate={v.animate} msg={v.msg} open={v.open} items={v.items} getCur={this.dropDown} />
                    :<li key={`rightList${k}`} onClick={this.handleClick.bind(this,v)}>
                      <a href={v.href}>
                        {v.icon&&<i className={`fa fa-${v.icon}`}></i>}
                        {v.name}
                      </a>
                    </li>
                  )
                })
              }
              {
                !this.props.hideRightTogbar&&
                <li className="toggle-right-sidebar" onClick={this.rightBar}>
                  <a href="javascript:;"><i className="fa fa-hand-o-right"></i></a>
                </li>
              }
            </ul>:
            <ul>
              <li><a href={login.loginUrl}>登录</a></li>
              <li><a href={login.signupUrl}>注册</a></li>
            </ul>
          }
        </article>
      </nav>
    );
  }
}
