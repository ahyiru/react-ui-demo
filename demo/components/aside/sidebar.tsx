import * as React from 'react';

import {hasClass,addClass,removeClass} from '../../tools/dom-tools';
import {$storage} from '../../tools/yiru-tools';

//根据屏幕大小控制collapse
let smallScreen=()=>{
  let isH=hasClass(document.body,'horizontal');
  let isSH=hasClass(document.body,'h-collapse');
  clearTimeout(resizeTimer);
  let collapse=$storage.get('collapse')||'';
  if(!collapse){
    if(document.body.clientWidth<768){
      if(isH){
        removeClass(document.body,'horizontal');
        addClass(document.body,'h-collapse');
      }else if(isSH){

      }else{
        addClass(document.body,'y-collapse');
      }
    }else if(document.body.clientWidth<992){
      if(isSH){
        removeClass(document.body,'h-collapse');
        addClass(document.body,'horizontal');
      }else if(isH){
        
      }else{
        addClass(document.body,'y-collapse');
      }
    }else{
      if(isSH){
        removeClass(document.body,'h-collapse');
        addClass(document.body,'horizontal');
      }else if(isH){

      }else{
        removeClass(document.body,'y-collapse');
      }
    }
  }
},resizeTimer=0;
//...
resizeTimer=setTimeout(smallScreen,300);
//...
//resize
window.addEventListener('resize',()=>{
  resizeTimer=setTimeout(smallScreen,300);
});

export interface SidebarProps {
  menu?:any;
  projectList?:any;
  userInfo?:any;
};

export default class Sidebar extends React.Component<SidebarProps,any> {
  timer:number=0;
  state={
    menu:this.props.menu,
    icon1:'minus',
    icon2:'plus',
    collapsed1:'',
    collapsed2:' collapsed',
    hideNavbar:false,
    lopen:false,
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
      menu:nextProps.menu,
      hideNavbar:false,
    });
  };

  /*firstMenuClick1=(v,k)=>{
    // e.stopPropagation();
    // e.preventDefault();
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
          }else{
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
      }else{
        newMenu.map((val,key)=>{
          if(k==key){
            !flag&&(
              val.selMenu='active'
            );
          }else{
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
  };*/
  firstMenuClick=(v,k)=>{
    let isH=hasClass(document.body,'horizontal');
    let isS=hasClass(document.body,'y-collapse');
    let hasSub=!!v.subMenu;
    if(!isH&&!isS&&hasSub){
      let newMenu=this.state.menu;
      newMenu.map((val,key)=>{
        if(k==key){
          val.open=val.open?'':'open',
          val.toggleSlide={
            height:val.open?(val.subMenu.length*32+16):0
          }
        }else{
          val.open='',
          val.toggleSlide={
            height:0
          }
        }
      });
      this.setState({
        menu:newMenu
      });
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
          }else{
            sv.selected='';
          }
        });
      }else{
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
    let isH=hasClass(document.body,'horizontal');
    let isS=hasClass(document.body,'y-collapse');
    if(isH||isS){
      this.timer=setTimeout(()=>{
        let newMenu=this.state.menu;
        newMenu.map((val,key)=>{
          if(k==key){
            val.hover='hover';
          }else{
            val.hover='';
          }
        });
        this.setState({
          menu:newMenu,
          lopen:isS,
        });
      },200);
    }
  };
  menuMouseLeave=(v,k)=>{
    let isH=hasClass(document.body,'horizontal');
    let isS=hasClass(document.body,'y-collapse');
    if(isH||isS){
      clearTimeout(this.timer);
      let newMenu=this.state.menu;
      newMenu.map((val,key)=>{
        if(k==key){
          val.hover='';
        }
      });
      this.setState({
        menu:newMenu,
        lopen:false,
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
    }else if(id==2){
      this.setState({
        collapsed2:this.state.collapsed2?'':' collapsed',
        icon2:this.state.icon2=='plus'?'minus':'plus'
      });
    }
  };

  toggleNavbar=(e)=>{
    e.stopPropagation();
    this.setState({
      hideNavbar:!this.state.hideNavbar,
    })
  };

  render() {
    const {projectList,userInfo}=this.props;
    
    const {menu,hideNavbar,lopen}=this.state;

    const ropen=hideNavbar?' r-open':'';

    const open=lopen?' open':'';

    return (
      <section className={`y-sidebar${ropen}${open}`}>
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
          <div className="y-sidebar-list ysl-menu">
            <div className="y-sidebar-title" onClick={this.collapseList.bind(this,'1')}>
              <i className={`fa fa-${this.state.icon1}`}></i>
              <h4>导航栏</h4>
            </div>
            <ul className={`y-sidebar-l1${this.state.collapsed1}`}>
              
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
                                <li key={`subMenu${sk}`} /*onClick={this.subMenuClick.bind(this,k,sk)}*/>
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
        <div className="navbar-collapse">
          <a href="javascript:;" onClick={this.toggleNavbar}>
            <i className="fa fa-bars"></i>
          </a>
        </div>
      </section>
    );
  }
}
