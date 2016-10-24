import * as React from 'react';

import './test.less';

let cards:any=[[{
  name:'企业信息查询',
  icon:'fa fa-search',
  pic:'bg1'
},
{
  name:'企业信用目录',
  icon:'fa fa-edit',
  pic:'bg2'
},
{
  name:'异议情况核实',
  icon:'fa fa-search-plus',
  pic:'bg3'
}],[{
  name:'前置机配置',
  icon:'fa fa-wrench',
  pic:'bg4'
},
{
  name:'信息共享管理',
  icon:'fa fa-commenting',
  pic:'bg5'
},
{
  name:'统计分析',
  icon:'fa fa-bar-chart',
  pic:'bg6'
}],[{
  name:'数据归集管理',
  icon:'fa fa-file',
  pic:'bg7'
},
{
  name:'数据上报管理',
  icon:'fa fa-upload',
  pic:'bg8'
},
{
  name:'支撑管理',
  icon:'fa fa-user-plus',
  pic:'bg9'
}]];

export default class Demo1 extends React.Component<any,any> {

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

  render() {
    var that=this;
    return (
      <div className="demo1">
      {
        cards.map((v,k)=>{
          return (
            <div key={`c-${k}`}  className="yrow">
            {
              v.map((sv,sk)=>{
                return (
                  <div key={`c-${k}-${sk}`} className="y-card">
                    <article className={sv.pic+' '+sv.animate} onMouseEnter={that.mouseEnter.bind(that,k,sk)} onMouseLeave={that.mouseLeave}>
                      <div className="b-txt">
                        <div className="txt">{sv.name}</div>
                      </div>
                      <div className="t-txt">
                        <div className="txt">{sv.name}</div>
                      </div>
                      <div className="ico">
                        <div><i className={sv.icon}></i></div>
                      </div>
                    </article>
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
