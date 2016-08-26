import React, { Component } from 'react';

import Header from 'components/header/Header';
import Sidebar from 'components/sidebar/Sidebar';

import EventEmitter from '../../configs/eventEmitter';

import {sidebarMenu,notifyList} from '../../models/models';


var getCurrent=function(obj,str,data){
	if(str){
		str=str[1];
    if(str==='/') str='/#/';
		obj.map(function(v,k){
			if(v.subMenu&&v.subMenu.length>0){
				var flag=false;
				v.subMenu.map(function(sv,sk){
					if(sv.url==str){
						data.subTitle=sv.title;
						flag=true;
						data.level=2;

						sv.selected='active';
					}
					else{
						sv.selected='';
					}
				});
				flag?(
					data.title=v.title,

					v.selMenu='active',
					v.open='open',
          v.toggleSlide={
            height:v.subMenu.length*32+16
          }
				):(
					v.selMenu='',
					v.open='',
          v.toggleSlide={
            height:0
          }
				);
			}
			else{
				if(v.url==str){
					data.title=v.title;
					data.subTitle='';

					v.selMenu='active';
				}
				else{
					v.selMenu='';
          !!v.subMenu&&v.subMenu.map(function(sv,sk){
            sv.selected='';
          });
				}
				
			}
		});
	}

	return obj;
};

export default class Base extends Component {

	constructor(props){
    super(props);
    var str=location.hash.match(/#(\S+)\?/);
    var data={
      title:'',
      subTitle:'',
      level:1
    };
    getCurrent(sidebarMenu,str,data);
    this.state=({
    	menu:sidebarMenu,
    	data:data,
      notify:notifyList[3]
    });

    const that=this;
    //hashchange
    window.addEventListener('hashchange',function(){
    	var str=location.hash.match(/#(\S+)\?/);
    	getCurrent(sidebarMenu,str,data);

    	that.setState({
    		menu:sidebarMenu,
    		data:data
    	});
    },false);
    //scroll
    window.addEventListener('scroll',(e)=>{
      var show='';
      var st=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
      if(st>500){
        show='y-show';
      }
      else{
        show='';
      }
      this.setState({
        show:show
      });
    },false);
  };

  componentDidMount(){
    var self=this,currentNotify={},timer;
    EventEmitter.subscribe('subNotify',function(val){
      notifyList.map(function(v,k){
        if(v.class.indexOf(val)!=-1){
          currentNotify=notifyList[k];
        }
      });
      clearTimeout(timer);
      self.setState({
        notify:currentNotify,
        yShow:'y-show'
      });
      timer=setTimeout(function(){
        self.setState({
          yShow:''
        });
      },3000);
    });
  }
  componentWillUnmount(){
    EventEmitter.unSubscribe('subNotify');
  }

  mouseEnter=()=>{
    this.setState({
      hover:'ybt-hover'
    })
  }
  mouseLeave=()=>{
    this.setState({
      hover:''
    })
  }
  backTop=()=>{
    document.body.scrollTop=0;
  }

  render() {
  	const {children}=this.props;
  	const {data,menu,show,hover,notify,yShow}=this.state;
    return (
      <div>
        <Header />
        <Sidebar menu={menu} />

        <main>
	        <section className="y-main">
	          <div className="y-container">
	            <div className="y-pageheader">
	              <h2>{data.title} <span> {data.subTitle}</span></h2>
	              <div className="y-page-bar">
	                <ul className="y-page-breadcrumb">
	                  <li>
	                    <a href="javascript:;"><i className="fa fa-home"></i> {data.title}</a>
	                  </li>
	                  <li className={data.level<2&&'y-hide'}>
	                    <a href="javascript:;">{data.subTitle}</a>
	                  </li>
	                  <li className={data.level<3&&'y-hide'}>
	                    <a href="javascript:;">{data.subTitle}</a>
	                  </li>
	                </ul>
	                <article className="y-timer"></article>
	              </div>
	            </div>

	            <div className="y-pagecontent">
	              <div>{children}</div>
	            </div>

	          </div>
	          
	          <div className={'y-back-top '+show+' '+hover} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={this.backTop}>
	            <i className="fa fa-angle-up"></i>
	            <span>返回顶部</span>
	          </div>

	        </section>
	      </main>

        <div>
          <div className={'y-notification '+yShow+' '+notify.class}>
            <i className={notify.icon}></i><span>{notify.txt}</span>
          </div>
        </div>
      </div>
    );
  }
}
