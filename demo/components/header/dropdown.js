import React, { Component, PropTypes } from 'react';

export default class DropDown extends Component {

  constructor(props){
    super(props);
    /*this.state=({
      open:''
    });*/
  };

  toggleDrop=(e)=>{
    e.stopPropagation();
    this.props.getCur(this.props.name);
    /*this.setState({
      open:this.state.open?'':'open',
    });*/
  };

  render() {
    const {name,icon,animate,msg,sel,open,items}=this.props;
    return (
      <li className={'y-dropdown '+name+' '+(sel?open:'')} onClick={this.toggleDrop}>
        <a href="javascript:;">
          <i className={icon}></i>
          <span className={'y-badge '+(msg?'':'y-hide')}>{msg}</span>
        </a>
        <div className={'y-dropdown-menu '+(name=='theme'?'left ':'')+animate}>
          <article className="y-lists">
            <h4 className="y-list-title">{name}</h4>
            {
              (name=='theme')?items.map(function(v,k){
                return(
                  <div className="y-list">
                    <h4>{v}</h4>
                    <ul className="theme-select">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                )
              }):items.map(function(v,k){
                return(
                  <div className="y-list">
                    <div className="y-list-left">
                      <div className="pic">{v.pic}</div>
                    </div>
                    <div className="y-list-middle">
                      <div className="ylm-content">
                        <h4>{v.h4}</h4>
                        <p>{v.p}</p>
                      </div>
                    </div>
                    <div className="y-list-right">
                      <i className="fa fa-user"></i>
                    </div>
                  </div>
                )
              })
            }
          </article>
        </div>
      </li>
    );
  }
}
