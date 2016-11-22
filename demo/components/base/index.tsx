import * as React from 'react';

import Yheader from '../header';
import Yaside from '../aside';
import YpageHeader from './ypageheader';
import YbackTop from './ybacktop';
import Ynotify from './ynotify';

import {getCurrent} from '../../configs/tools';

import {sidebarMenu,notifyList} from '../../models/models';

// import AMap from 'AMap';

interface BaseProps {

}

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
    // this.str=location.hash.match(/#(\S+)\?/);
    this.str=location.hash.match(/#(\S+)/);
    this.data={
      title:'',
      subTitle:'',
      level:1
    };
    let obj=getCurrent(sidebarMenu,this.str,this.data);
    this.state=({
    	menu:obj,
    	data:this.data,
      notify:notifyList
    });

    const that=this;
    //hashchange
    window.addEventListener('hashchange',()=>{
      document.documentElement.scrollTop?(document.documentElement.scrollTop=0):(document.body.scrollTop=0);
    	// let str=location.hash.match(/#(\S+)\?/);
      let str=location.hash.match(/#(\S+)/);
    	let obj=getCurrent(sidebarMenu,str,this.data);
    	that.setState({
    		menu:obj,
    		data:this.data
    	});
    },false);
  };

  render() {
  	const {children}=this.props;
  	const {data,menu,notify}=this.state;
    return (
      <div>
        <Yheader />
        <Yaside sideBarMenu={menu} />

        <main>
	        <section className="y-main">
	          <div className="y-container">
	            
              <YpageHeader data={data} hidePagetitle={false} />

	            <div className="y-pagecontent">
	              <div>{children}</div>
	            </div>

	          </div>
	          
	          <YbackTop />

	        </section>
	      </main>

        <Ynotify notify={notify} />
      </div>
    );
  }
}
