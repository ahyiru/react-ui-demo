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
    const {name,icon,animate,msg,sel,open}=this.props;
    return (
      <li className={'y-dropdown '+name+' '+(sel?open:'')} onClick={this.toggleDrop}>
        <a href="javascript:;">
          <i className={icon}></i>
          <span className={'y-badge '+(msg?'':'y-hide')}>{msg}</span>
        </a>
        <ul className={'y-dropdown-menu '+animate}>
          <li>
            <ul>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </li>
          <li>
            <div>
              
            </div>
          </li>
        </ul>
      </li>
    );
  }
}
