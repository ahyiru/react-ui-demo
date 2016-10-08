import * as React from 'react';

import YdropDown from './ydropdown';

import {removeClass,toggleClass} from '../../configs/tools';

export default class Ynav extends React.Component<any,any> {

  constructor(props){
    super(props);
    this.state=({
      leftList:this.props.dropList.leftList,
      rightList:this.props.dropList.rightList,
      searchFlag:this.props.dropList.searchFlag
    });

    window.addEventListener('click',(e)=>{
      e.stopPropagation();
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
    });
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
    this.setState({
      sideBar:true
    });
    let body=document.body;
    toggleClass(body,'y-collapse');
  };

  rightBar=()=>{
    this.setState({
      rightBar:true
    });
    toggleClass(document.getElementsByClassName('right-bar')[0],'open');
  }  

  render() {
    const {leftList,rightList,searchFlag}=this.state;
    let that=this;
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
                  <YdropDown key={`leftList${k}`} name={v.name} icon={v.icon} animate={v.animate} msg={v.msg} open={v.open} items={v.items} getCur={that.dropDown} />
                )
              })
            }
          </ul>
          {
            searchFlag?
              <div className="y-search">
                <input type="text" placeholder="搜索..." />
                <i className="fa fa-search"></i>
              </div>
            :''
          }
        </article>
        <article className="y-nav-wrap y-nav-right">
          <ul>

            {
              rightList.map((v,k)=>{
                return(
                  <YdropDown key={`rightList${k}`} name={v.name} icon={v.icon} animate={v.animate} msg={v.msg} open={v.open} items={v.items} getCur={that.dropDown} />
                )
              })
            }
            
            <li className="toggle-right-sidebar" onClick={this.rightBar}>
              <a href="javascript:;"><i className="fa fa-hand-o-right"></i></a>
            </li>
          </ul> 
        </article>
      </nav>
    );
  }
}
