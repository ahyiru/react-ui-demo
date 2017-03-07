import * as React from 'react';

import {$emitter} from '../../tools/yiru-tools';

export default class Notify extends React.Component<any,any> {
  timer:number;
	constructor(props){
    super(props);
    const {notify}=this.props;
    this.timer=0;
    this.state=({
      notify:notify[3]
    });
  };

  componentDidMount(){
    let self=this,currentNotify=null;
    $emitter.subscribe('subNotify',(className,ico,val)=>{
      this.props.notify.map((v,k)=>{
        if(v.class.indexOf(className)!=-1){
          currentNotify=v;
          ico&&(currentNotify.icon=ico);
          val&&(currentNotify.txt=val);
        }
      });
      currentNotify=currentNotify||{
        class:'top-middle success',
        icon:'fa fa-check-square-o',
        txt:val
      };
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
    $emitter.unSubscribe('subNotify');
  };

  render() {
    const {notify,yShow}=this.state;
    return (
      <div>
        <div className={`y-notification ${yShow} ${notify.class}`}>
          <i className={notify.icon}></i><span>{notify.txt}</span>
        </div>
      </div>
    );
  }
}
