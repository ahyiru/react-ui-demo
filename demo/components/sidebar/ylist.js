import React, { Component } from 'react';
import { Link } from 'react-router';

import {rightbarTabLists as lists} from '../../models/models';

export default class YList extends Component {

  constructor(props){
    super(props);
    this.state=({
      active:'active'
    });
  };

  selectList=()=>{
    this.setState({

    });
  };

  render() {

    const {active}=this.state;
    const {tab}=this.props;

    return (
      <article className={'y-tab-page y-lists '+tab.active}>
        <h4 className="y-list-title">{tab.name}</h4>
        {
          lists.map(function(v,k){
            return(
              <div key={'list'+tab.id+k} className="y-list">
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
                  <i className={v.rightIcon}></i>
                </div>
              </div>
            )
          })
        }
      </article>
    );
  }
}
