import * as React from 'react';

import Yheader from '../header';
import Yaside from '../aside';
import PageHeader from './pageheader';
import Main from './main';
import Notify from './notify';

import {getCurrent,getBreadcrumb,localData} from '../../configs/tools';

import {sidebarMenu,notifyList} from '../../models/models';

// import AMap from 'AMap';


export type ButtonType = 'primary' | 'ghost' | 'dashed' | 'danger'
export type ButtonShape = 'circle' | 'circle-outline'
export type ButtonSize = 'small' | 'large'

export interface BaseProps {
  type?: ButtonType;
  htmlType?: string;
  icon?: string;
  shape?: ButtonShape;
  size?: ButtonSize;
  onClick?: React.FormEventHandler<any>;
  onMouseUp?: React.FormEventHandler<any>;
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
  prefixCls?: string;
  className?: string;
  ghost?: boolean;
};

export default class Yframe extends React.Component<any,any> {
  str:string|string[];
  data:any;
  static sidebarMenu=sidebarMenu;
  static notifyList=notifyList;

  static propTypes={
    
  };
  static defaultProps={
    auth:'yiru'
  };

  static contextTypes={
    router:React.PropTypes.object
  };

  // breadcrumb多级显示
  /*componentDidMount=()=>{
    window.addEventListener('hashchange',()=>{
      var uri=location.hash.match(/#(\S+)\?/)[1];
      var ul=document.getElementsByClassName('y-page-breadcrumb')[0];
      while(ul.children.length>2){
        ul.removeChild(ul.lastChild);
      };
      breadcrumb.map((v,k)=>{
        if(v.curUrl==uri){
          while(ul.children.length>1){
            ul.removeChild(ul.lastChild);
          };
          v.data.url.map((sv,sk)=>{
            var li=document.createElement('li');
            var a=document.createElement('a');
            a.href=sv;
            a.innerHTML=v.data.txt[sk];
            li.appendChild(a);
            ul.appendChild(li);
          })
        }
      })
    },false)
  };*/

  /*componentWillMount=()=>{
    const script=document.createElement("script");
    script.src='http://webapi.amap.com/maps?v=1.3&key=f4594ba4b95c47bd0726b323e2e49204';
    script.type='text/javascript';
    document.head.appendChild(script);
  };*/

  /*componentDidMount=()=>{
    var map=new AMap.Map('container',{
      resizeEnable:true,
      zoom:11,
      center:[116.397428,39.90923]
    });
  };*/

	constructor(props){
    super(props);
    this.str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
    // this.str=location.pathname;

    let menu=getCurrent(sidebarMenu,this.str);
    let breadcrumb=getBreadcrumb(sidebarMenu,this.str);
    this.state=({
    	menu:menu,
    	breadcrumb:breadcrumb,
      notify:notifyList
    });

    /*window.addEventListener('popstate',(e)=>{
      console.log(e);
    },false);*/

    window.addEventListener('hashchange',this.hashChg,false);
  };

  componentWillMount(){
    var token=localStorage.getItem('token');
    if(!token){
      this.context.router.push('/user/login');
    }
  };

  //hashchange
  hashChg=()=>{
    document.documentElement.scrollTop?(document.documentElement.scrollTop=0):(document.body.scrollTop=0);
    let str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
    // let str=location.pathname;
    let menu=getCurrent(sidebarMenu,str);
    let breadcrumb=getBreadcrumb(sidebarMenu,str);
    this.setState({
      menu:menu,
      breadcrumb:breadcrumb
    });
  }

  componentWillUnmount=()=>{
    window.removeEventListener('hashchange',this.hashChg,false);
  };

  render() {
  	const {children}=this.props;
  	const {breadcrumb,menu,notify}=this.state;
    let user=localData.get('user');
    (user&&user.role<1)&&(menu.splice(1,1));
    return (
      <div className="@yiru">
        <Yheader />
        <Yaside sideBarMenu={menu} />

        <Main breadcrumb={breadcrumb} hidePagetitle={false}>
          {this.props.children}
        </Main>

      </div>
    );
  }
}
