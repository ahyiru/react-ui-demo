import * as React from 'react';

import Header from '../header';
import Aside from '../aside';
import PageHeader from './pageheader';
import Main from './main';
import Notify from './notify';

import {getCurrent,getBreadcrumb} from '../../tools/dom-tools';

import {sidebarMenu,notifyList} from '../../models/models';

import {isAuthed,getUser,getDefault} from '../../servers/storage';

// import AMap from 'AMap';

/*const str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
const menu=getCurrent(sidebarMenu,str);
const breadcrumb=getBreadcrumb(sidebarMenu,str);*/

export default class Frame extends React.Component<any,any> {
  // str:string|string[];
  // data:any;
  /*state={
    menu:menu,
    breadcrumb:breadcrumb,
  };*/
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

	/*constructor(props){
    super(props);
    this.str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
    // this.str=location.pathname;
    let menu=getCurrent(sidebarMenu,this.str);
    let breadcrumb=getBreadcrumb(sidebarMenu,this.str);
    this.state=({
    	menu:menu,
    	breadcrumb:breadcrumb,
    });
    // window.addEventListener('popstate',(e)=>{
    //   console.log(e);
    // },false);
  };*/
  
  componentWillMount(){
    if(!isAuthed()){
      this.context.router.push('/user/login');
      return;
    }
    window.addEventListener('hashchange',this.hashChg,false);
  };
  componentDidMount(){
    
  };
  //hashchange
  hashChg=()=>{
    document.documentElement.scrollTop?(document.documentElement.scrollTop=0):(document.body.scrollTop=0);
    /*let str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
    // let str=location.pathname;
    let menu=getCurrent(sidebarMenu,str);
    let breadcrumb=getBreadcrumb(sidebarMenu,str);
    this.setState({
      menu:menu,
      breadcrumb:breadcrumb,
    });*/
  };
  componentWillUnmount=()=>{
    window.removeEventListener('hashchange',this.hashChg,false);
  };

  render() {
  	// const {breadcrumb,menu}=this.state;
    getDefault();
    const str=location.hash.match(/#(\S+)\?/)||location.hash.match(/#(\S+)/);
    const menu=getCurrent(sidebarMenu,str);
    const breadcrumb=getBreadcrumb(sidebarMenu,str);
    
    let user=getUser();
    (user&&user.role<1)&&(menu.splice(1,1));
    return (
      <div className="@yiru">
        <Header />
        <Aside sideBarMenu={menu} />

        <Main breadcrumb={breadcrumb} hidePagetitle={false}>
          {this.props.children}
        </Main>

      </div>
    );
  }
}
