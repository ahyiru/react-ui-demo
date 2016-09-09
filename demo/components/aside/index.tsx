import * as React from 'react';

import YsideBar from './ysidebar';
import YrightBar from './yrightbar';

import {rightbarTabs,rightbarTabLists} from '../../models/models';

export default class Yaside extends React.Component<any,any> {

  constructor(props){
    super(props);
  };

  render() {

    return (
      <aside>
        <YsideBar menu={this.props.sideBarMenu} />
        <YrightBar tabs={rightbarTabs} tabList={rightbarTabLists} />
      </aside>
    );
  }
}
