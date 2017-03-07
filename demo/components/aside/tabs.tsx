import React, { Component } from 'react';

export interface TabsProps {
  active?:number;
};

export default class Tabs extends Component<TabsProps,any> {
  static propTypes={
    active:React.PropTypes.number,
  };
  static defaultProps={
    active:0,
  };
  constructor(props){
    super(props);
    this.state=(this.init());
  };

  init=()=>{
    const {active}=this.props;
    return {
      active:active,
      currentTab:{
        left:64*active
      }
    };
  }

  switchTab=(index)=>{
    this.setState({
      active:index,
      currentTab:{
        left:64*index
      }
    });
  };

  render() {
    const {active,currentTab}=this.state;
    const tabs:any=this.props.children;
    return (
      <div className="y-tabs-wrap">
        <ul className="y-tab">
          {
            tabs.map((v,k)=>{
              return(
                <li key={`tab${k}`} className={k===active?'active':''} onClick={this.switchTab.bind(this,k)}>
                  <i className={`fa fa-${v.props.icon}`}></i>
                  {/*v.props.name*/}
                </li>
              )
            })
          }
          <span className="y-tab-act" style={currentTab}></span>
        </ul>
        {tabs[active]}
      </div>
    );
  }
};

export interface TabpageProps {
  name?:string;
  icon?:string;
};

export class Tabpage extends Component<TabpageProps,any>{
  static propTypes={
    name:React.PropTypes.string,
    icon:React.PropTypes.string,
  };
  static defaultProps={
    name:'tab-title',
  };
  render(){
    return (
      <article className="y-tab-page">
        {this.props.children}
      </article>
    )
  };
};









