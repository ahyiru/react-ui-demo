import * as React from 'react';

import {cards} from './data';

import './test.less';

export default class Demo1 extends React.Component<any,any> {
  // cards:any[];
  constructor(props){
    super(props);
    cards.map((v,k)=>{
      v.map((sv,sk)=>{
        sv.animate='';
      })
    });
    this.state=({
      cards:cards
    })
  };

  mouseEnter=(kh,skh)=>{
    cards.map((v,k)=>{
      if(k==kh){
        v.map((sv,sk)=>{
          if(sk==skh){
            sv.animate='hover';
          }
        })
      }
    });
    this.setState({
      cards:cards
    })
  };
  mouseLeave=()=>{
    cards.map((v,k)=>{
      v.map((sv,sk)=>{
        sv.animate='';
      })
    });
    this.setState({
      cards:cards
    })
  };
  gotoPage=()=>{
    console.log('gotoPage');
  };

  render() {
    var that=this;
    return (
      <div className="demo d1">
      {
        cards.map((v,k)=>{
          return (
            <div key={`c-${k}`}  className="yrow">
            {
              v.map((sv,sk)=>{
                return (
                  <div key={`c-${k}-${sk}`} className="y-card">
                    <a className={sv.pic+' '+sv.animate} onMouseEnter={that.mouseEnter.bind(that,k,sk)} onMouseLeave={that.mouseLeave} onClick={that.gotoPage} href={sv.url}>
                      <div className="b-txt">
                        <div className="txt">{sv.name}</div>
                      </div>
                      <div className="t-txt">
                        <div className="txt">{sv.name}</div>
                      </div>
                      <div className="ico">
                        <div><i className={sv.icon}></i></div>
                      </div>
                    </a>
                  </div>
                )
              })
            }
            </div>
          )
        })
      }
      </div>
    )
  };
}
