import * as React from 'react';

import { Link } from 'react-router';

import {hasClass,addClass,removeClass} from '../../configs/tools';

/*const slideStyle={
  height:0,
  // transitionProperty:'height',
  // transitionDuration:'.3s',
  // transitionTimingFunction:'ease-in-out'
};*/

/*menu.map(function(v,k){
  !!v.subMenu&&(v.toggleSlide=slideStyle);
});*/

//根据屏幕大小控制collapse
let smallScreen=()=>{
  clearTimeout(timer);
  if(document.body.clientWidth<992){
    addClass(document.body,'y-sidebar-sm y-collapse');
  }
   else{
    removeClass(document.body,'y-sidebar-sm y-collapse');
  }

  // mouse
  // var subMenuItem=document.getElementsByClassName('y-sidebar-l1')[0].childNodes;
  /*for(var i=0,l=subMenuItem.length;i<l;i++){
    console.log(subMenuItem[i]);
  }*/
  /*subMenuItem[0].addEventListener('mouseenter',()=>{
    addClass(document.getElementsByClassName('y-sidebar')[0],'open');
    console.log(this);
  });
  subMenuItem[0].addEventListener('mouseleave',()=>{
    removeClass(document.getElementsByClassName('y-sidebar')[0],'open');
  });*/

},timer=0;
//...
timer=setTimeout(smallScreen,350);
//...
//resize
window.addEventListener('resize',()=>{
  timer=setTimeout(smallScreen,350);
});

// console.log(menu);

export default class Ysidebar extends React.Component<any,any> {
  timer:number;
  constructor(props){
    super(props);
    const {menu}=this.props;
    this.timer=0;
    this.state=({
      menu:menu,
      icon1:'minus',
      icon2:'minus'
    });

    //resize
    /*window.addEventListener('click',(e)=>{
      e.stopPropagation();
      var dropList=this.state.dropList;
      var theme=this.state.theme;
      dropList.map(function(v,k){
        v.sel=false;
        v.open='';
      });
      theme.sel=false;
      theme.open='';
      this.setState({
        dropList:dropList,
        theme:theme
      });
    });*/
    //
  };

  firstMenuClick=(v,k)=>{
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
      this.timer=setTimeout(()=>{
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
          menu:newMenu
        });
      },200);
    }
  };
  menuMouseLeave=(v,k)=>{
    if(hasClass(document.body,'y-collapse')){
      clearTimeout(this.timer);
      removeClass(document.getElementsByClassName('y-sidebar')[0],'open');
      let newMenu=this.state.menu;
      newMenu.map((val,key)=>{
        if(k==key){
          val.hover='';
        }
      });
      this.setState({
        menu:newMenu
      });
    }
  };

  gotoProject=(k)=>{

  };

  collapseList=(id)=>{
    if(id==1){
      this.setState({
        collapsed1:this.state.collapsed1?'':'collapsed',
        icon1:this.state.icon1=='plus'?'minus':'plus'
      });
    }
    else if(id==2){
      this.setState({
        collapsed2:this.state.collapsed2?'':'collapsed',
        icon2:this.state.icon2=='plus'?'minus':'plus'
      });
    }
  };

  render() {
    const {projectList,userInfo}=this.props;
    
    const {menu}=this.state;

    const that=this;

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
            <ul className={`y-sidebar-l1 ${this.state.collapsed1}`}>
              
              {
                menu.map((v,k)=>{
                  return(
                    <li key={`firstMenu${k}`} className={v.open} onMouseEnter={that.menuMouseEnter.bind(that,v,k)} onMouseLeave={that.menuMouseLeave.bind(that,v,k)}>
                      <a href={v.url} className={v.selMenu} onClick={that.firstMenuClick.bind(that,v,k)}>
                        <i className={v.leftIcon}></i>
                        <p>{v.title}</p>
                        {!!v.subMenu?<i className={v.rightIcon}></i>:<span></span>}
                      </a>
                      {!!v.subMenu&&v.subMenu.length>0?
                        <ul className={v.hover} style={v.toggleSlide}>
                          {
                            v.subMenu.map((sv,sk)=>{
                              return(
                                <li key={`subMenu${sk}`} onClick={that.subMenuClick.bind(that,k,sk)}>
                                  <Link to={sv.url} className={sv.selected}>
                                    <i className={sv.icon}></i>
                                    <span>{sv.title}</span>
                                  </Link>
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
              <ul className={`y-sidebar-l1 ${this.state.collapsed2}`}>
                {
                  projectList.map((v,k)=>{
                    return(
                      <li key={`project${k}`}>
                        <a href={v.url} onClick={that.gotoProject.bind(that,k)}>
                          <i className={v.icon}></i>
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
