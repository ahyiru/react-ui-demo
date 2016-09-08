import * as React from 'react';
import { Link } from 'react-router';

import DropDown from './dropdown';

import {dropList} from '../../models/models';

import {removeClass,toggleClass} from '../../configs/tools';

export default class Header extends React.Component<any,any> {

  constructor(props){
    super(props);
    this.state=({
      dropList:dropList,
      theme:{
        name:'theme',
        icon:'fa fa-cog',
        animate:'fade-in-up',
        open:'',
        items:['header','branding','sidebar','active']
      }
    });

    window.addEventListener('click',(e)=>{
      e.stopPropagation();
      let dropList=this.state.dropList;
      let theme=this.state.theme;
      dropList.map((v,k)=>{
        v.open='';
      });
      theme.open='';
      this.setState({
        dropList:dropList,
        theme:theme
      });
    });
  };

  dropDown=(cur)=>{
    let dropList=this.state.dropList;
    let theme=this.state.theme;
    dropList.map((v,k)=>{
      if(v.name==cur){
        v.open=v.open?'':'open';
      }
      else{
        v.open='';
      }
    });
    
    if(theme.name==cur){
      theme.open=theme.open?'':'open';
    }
    else{
      theme.open='';
    }
    this.setState({
      dropList:dropList,
      theme:theme
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
    const {name,animate,icon,open,items}=this.state.theme;
    let that=this;
    return (
      <header>
        <div className="y-header">
          <section className="y-brand">
            <a href="javascript:;" className="brand"> 
              <h4 className="logo"></h4> <span><b>React</b> UI Demo</span>   
            </a>
          </section>
          <nav className="y-nav">
            <article className="y-nav-wrap y-nav-left">
              <ul className="y-left">
                <li className="sidebar-collapse" onClick={this.sideBar}>
                  <a href="javascript:;">
                    <i className="fa fa-outdent"></i>
                  </a>
                </li>
                <DropDown name={name} icon={icon} animate={animate} open={open} items={items} getCur={that.dropDown} />
              </ul>
              <div className="y-search">
                <input type="text" placeholder="搜索..." />
                <i className="fa fa-search"></i>
              </div>
            </article>
            <article className="y-nav-wrap y-nav-right">
              <ul>

                {
                  dropList.map((v,k)=>{
                    return(
                      <DropDown key={k} name={v.name} icon={v.icon} animate={v.animate} msg={v.msg} open={v.open} items={v.items} getCur={that.dropDown} />
                    )
                  })
                }

                <li className="toggle-right-sidebar" onClick={this.rightBar}>
                  <a href="javascript:;"><i className="fa fa-hand-o-right"></i></a>
                </li>
              </ul> 
            </article>
          </nav>
        </div>
      </header>
    );
  }
}
