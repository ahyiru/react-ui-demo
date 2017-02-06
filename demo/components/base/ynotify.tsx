import * as React from 'react';

import {eventEmitter} from '../../configs/tools';

export default class Ynotify extends React.Component<any,any> {
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
    let self=this,currentNotify={};
    eventEmitter.subscribe('subNotify',(val)=>{
      this.props.notify.map((v,k)=>{
        if(v.class.indexOf(val)!=-1){
          currentNotify=v;
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
    eventEmitter.unSubscribe('subNotify');
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
