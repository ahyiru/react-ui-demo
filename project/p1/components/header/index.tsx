import * as React from 'react';

import Ynav from './ynav';

import {dropList} from '../../models/models';

export default class Header extends React.Component<any,any> {

  constructor(props){
    super(props);
  };

  render() {
    return (
      <header>
        <div className="y-header">
          <section className="y-brand">
            <a href="javascript:;" className="brand"> 
              {/*<h4 className="logo"></h4>*/} <span><b>React</b> UI Demo</span>   
            </a>
          </section>
          <Ynav className="y-nav" dropList={dropList} />
        </div>
      </header>
    );
  }
}
