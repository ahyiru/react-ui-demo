import * as React from 'react';

import Header from '../header/header';
import Sidebar from '../sidebar/sidebar';

import EventEmitter from '../../configs/eventEmitter';

import {sidebarMenu,notifyList} from '../../models/models';

let getCurrent=(obj,str,data)=>{
	if(str){
		str=str[1];
    if(str==='/') str='/#/';
		obj.map((v,k)=>{
			if(v.subMenu&&v.subMenu.length>0){
				let flag=false;
				v.subMenu.map((sv,sk)=>{
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
          !!v.subMenu&&v.subMenu.map((sv,sk)=>{
            sv.selected='';
          });
				}
				
			}
		});
	}

	return obj;
};

let backTop=()=>{
  document.body.scrollTop=0;
  document.documentElement.scrollTop=0;
};

interface BaseProps {

}

export default class Base extends React.Component<any,any> {
  str:string|string[];
  data:any;
  timer:number;
  static sidebarMenu=sidebarMenu;
  static notifyList=notifyList;

  static propTypes={
    
  };
  static defaultProps={
    auth:'yiru'
  };

	constructor(props){
    super(props);
    this.str=location.hash.match(/#(\S+)\?/);
    this.timer=0;
    this.data={
      title:'',
      subTitle:'',
      level:1
    };
    let obj=getCurrent(sidebarMenu,this.str,this.data);
    this.state=({
    	menu:obj,
    	data:this.data,
      notify:notifyList[3]
    });

    const that=this;
    //hashchange
    window.addEventListener('hashchange',()=>{
      backTop();
    	let str=location.hash.match(/#(\S+)\?/);
    	let obj=getCurrent(sidebarMenu,str,this.data);
    	that.setState({
    		menu:obj,
    		data:this.data
    	});
    },false);
    //scroll
    window.addEventListener('scroll',()=>{
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
    },false);
  };

  componentDidMount(){
    let self=this,currentNotify={};
    EventEmitter.subscribe('subNotify',(val)=>{
      notifyList.map((v,k)=>{
        if(v.class.indexOf(val)!=-1){
          currentNotify=notifyList[k];
        }
      });
      clearTimeout(this.timer);
      self.setState({
        notify:currentNotify,
        yShow:'y-show'
      });
      this.timer=setTimeout(()=>{
        self.setState({
          yShow:''
        });
      },3000);
    });
  };
  componentWillUnmount(){
    clearTimeout(this.timer);
    EventEmitter.unSubscribe('subNotify');
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
	          
	          <div className={`y-back-top ${show} ${hover}`} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave} onClick={backTop}>
	            <i className="fa fa-angle-up"></i>
	            <span>返回顶部</span>
	          </div>

	        </section>
	      </main>

        <div>
          <div className={`y-notification ${yShow} ${notify.class}`}>
            <i className={notify.icon}></i><span>{notify.txt}</span>
          </div>
        </div>
      </div>
    );
  }
}
