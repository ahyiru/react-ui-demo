import * as React from 'react';

import {hasClass,addClass,removeClass} from '../../tools/dom-tools';

let isH=hasClass(document.body,'horizontal');

//根据屏幕大小控制collapse
let smallScreen=()=>{
  clearTimeout(timer);
  let collapse=localStorage.getItem('collapse')||'';
  if(!collapse){
    if(document.body.clientWidth<992){
      // addClass(document.body,'y-sidebar-sm y-collapse');
      addClass(document.body,'y-collapse');
      removeClass(document.body,'horizontal');
    }
     else{
      // removeClass(document.body,'y-sidebar-sm y-collapse');
      removeClass(document.body,'y-collapse');
      isH&&addClass(document.body,'horizontal');
    }
  }
},timer=0;
//...
timer=setTimeout(smallScreen,350);
//...
//resize
window.addEventListener('resize',()=>{
  timer=setTimeout(smallScreen,350);
});

export interface SidebarProps {
  menu?:any;
  projectList?:any;
  userInfo?:any;
};

export default class Sidebar extends React.Component<SidebarProps,any> {
  static timer=0;
  state={
    menu:this.props.menu,
    icon1:'minus',
    icon2:'plus',
    collapsed1:'',
    collapsed2:' collapsed',
    toggleMenu:null,
  };
  static propTypes={
    menu:React.PropTypes.array,
    projectList:React.PropTypes.array,
    userInfo:React.PropTypes.object,
  };
  static defaultProps={
    userInfo:'',
    projectList:null,
  };

  componentWillReceiveProps=(nextProps)=>{
    this.setState({
      menu:nextProps.menu
    });
  };

  firstMenuClick=(v,k)=>{
    if(!hasClass(document.body,'horizontal')){
      let newMenu=this.state.menu;
      let flag=!!v.subMenu;
      if(!hasClass(document.body,'y-collapse')){
        newMenu.map((val,key)=>{
          if(k==key){
            flag?(
              val.open=val.open?'':'open',
              val.toggleSlide={
                height:val.open?(val.subMenu.length*32+16):0
              }
            ):(
              val.selMenu='active'
            );
          }
          else{
            flag?(
              val.open='',
              val.toggleSlide={
                height:0
              }
            ):(!!val.subMenu&&val.subMenu.map((subV,subK)=>{
              subV.selected='';
            }),val.selMenu='');
          }
          // val.toggleSlide=cloneObj(val.toggleSlide);
        });
        this.setState({
          menu:newMenu
        });
      }
      else{
        newMenu.map((val,key)=>{
          if(k==key){
            !flag&&(
              val.selMenu='active'
            );
          }
          else{
            flag&&(val.subMenu.map((subV,subK)=>{
              subV.selected='';
            }));
            val.selMenu='';
          }
        });
        this.setState({
          menu:newMenu
        });
      }
    }
  };

  subMenuClick=(k,subKey)=>{
    let newMenu=this.state.menu;
    newMenu.map((val,key)=>{
      if(k==key){
        val.selMenu='active';
        val.subMenu.map((sv,sk)=>{
          if(subKey==sk){
            sv.selected='active';
          }
          else{
            sv.selected='';
          }
        });
      }
      else{
        val.selMenu='';
        if(val.subMenu){
          val.subMenu.map((sv,sk)=>{
            sv.selected='';
          });
        }
      }
    });
    this.setState({
      menu:newMenu
    });
  };

  menuMouseEnter=(v,k)=>{
    if(hasClass(document.body,'y-collapse')){
      timer=setTimeout(()=>{
        addClass(document.getElementsByClassName('y-sidebar')[0],'open');
        let newMenu=this.state.menu;
        newMenu.map((val,key)=>{
          if(k==key){
            val.hover='hover';
          }
          else{
            val.hover='';
          }
        });
        this.setState({
          menu:newMenu,
          toggleMenu:{}
        });
      },200);
    }
    if(hasClass(document.body,'horizontal')){
      let newMenu=this.state.menu;
      let flag=!!v.subMenu;
      let toggleMenu={};
      newMenu.map((val,key)=>{
        if(k==key){
          flag&&(
            val.open='open',
            val.toggleSlide={
              height:val.subMenu.length*32+16
            },
            toggleMenu={
              height:val.subMenu.length*32+16+62,
              width:'200%'
            }
          )
        }
      });
      this.setState({
        menu:newMenu,
        toggleMenu:toggleMenu
      });
    }
  };
  menuMouseLeave=(v,k)=>{
    if(hasClass(document.body,'y-collapse')){
      clearTimeout(timer);
      removeClass(document.getElementsByClassName('y-sidebar')[0],'open');
      let newMenu=this.state.menu;
      newMenu.map((val,key)=>{
        if(k==key){
          val.hover='';
        }
      });
      this.setState({
        menu:newMenu,
        toggleMenu:{}
      });
    }
    if(hasClass(document.body,'horizontal')){
      let newMenu=this.state.menu;
      let flag=!!v.subMenu;
      let toggleMenu={};
      newMenu.map((val,key)=>{
        if(k==key){
          flag&&(
            val.open='',
            val.toggleSlide={
              height:0
            },
            toggleMenu={
              height:'100%',
              width:'100%'
            }
          )
        }
      });
      this.setState({
        menu:newMenu,
        toggleMenu:toggleMenu
      });
    }
  };

  gotoProject=(k)=>{

  };

  collapseList=(id)=>{
    if(id==1){
      this.setState({
        collapsed1:this.state.collapsed1?'':' collapsed',
        icon1:this.state.icon1=='plus'?'minus':'plus'
      });
    }
    else if(id==2){
      this.setState({
        collapsed2:this.state.collapsed2?'':' collapsed',
        icon2:this.state.icon2=='plus'?'minus':'plus'
      });
    }
  };

  render() {
    const {projectList,userInfo}=this.props;
    
    const {menu,toggleMenu}=this.state;

    return (
      <section className="y-sidebar">
        <div className="y-sidebar-wrap">
          {
            userInfo&&
            <div className="y-user-logo">
              <img src={userInfo.logo} alt="userLogo" />
              <h4>{userInfo.name}</h4>
              <p>{userInfo.email}</p>
            </div>
          }
          <div className="y-collapse-wrap"></div>
          <div className="y-sidebar-list">
            <div className="y-sidebar-title" onClick={this.collapseList.bind(this,'1')}>
              <i className={`fa fa-${this.state.icon1}`}></i>
              <h4>导航栏</h4>
            </div>
            <ul className={`y-sidebar-l1${this.state.collapsed1}`} style={toggleMenu}>
              
              {
                menu.map((v,k)=>{
                  return(
                    <li key={`firstMenu${k}`} className={v.open} onMouseEnter={this.menuMouseEnter.bind(this,v,k)} onMouseLeave={this.menuMouseLeave.bind(this,v,k)}>
                      <a href={v.url} className={v.selMenu} onClick={this.firstMenuClick.bind(this,v,k)}>
                        <i className={`fa fa-${v.leftIcon}`}></i>
                        <p>{v.title}</p>
                        {!!v.subMenu?<i className={`fa fa-${v.rightIcon}`}></i>:<span></span>}
                      </a>
                      {!!v.subMenu&&v.subMenu.length>0?
                        <ul className={v.hover} style={v.toggleSlide}>
                          {
                            v.subMenu.map((sv,sk)=>{
                              return(
                                <li key={`subMenu${sk}`} onClick={this.subMenuClick.bind(this,k,sk)}>
                                  <a href={sv.url} className={sv.selected}>
                                    <i className={`fa fa-${sv.icon}`}></i>
                                    <span>{sv.title}</span>
                                  </a>
                                </li>
                              )
                            })
                          }
                        </ul>
                      :''}
                    </li>
                  )
                })
              }
              
            </ul>
          </div>

          {!!projectList&&projectList.length>0?
            <div className="y-sidebar-list">
              <div className="y-sidebar-title" onClick={this.collapseList.bind(this,'2')}>
                <i className={`fa fa-${this.state.icon2}`}></i>
                <h4>项目列表</h4>
              </div>
              <ul className={`y-sidebar-l1${this.state.collapsed2}`}>
                {
                  projectList.map((v,k)=>{
                    return(
                      <li key={`project${k}`}>
                        <a href={v.url} onClick={this.gotoProject.bind(this,k)}>
                          <i className={`fa fa-${v.icon}`}></i>
                          <p>{v.title}</p>
                          <span></span>
                        </a>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          :''}
        </div>
      </section>
    );
  }
}
