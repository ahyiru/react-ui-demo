import * as React from 'react';

import SideBar from './sidebar';
import RightBar from './rightbar';

import Tabs,{Tabpage} from './tabs';

import List from './list';

import {isAuthed,getUser} from '../../servers/storage';

import {rightbarTabs,rightbarTabLists,projectList} from '../../models/models';

export interface AsideProps {
  sideBarMenu?:any;
};

export default class Aside extends React.Component<AsideProps,any> {
  state={auth:'yiru'};
  static propTypes={
    sideBarMenu:React.PropTypes.array,
  };
  static defaultProps={
    sideBarMenu:[],
  };
  render() {
    let user=getUser();
    user&&(user.logo=require('../../styles/images/usr.jpg'));
    return (
      <aside>
        <SideBar menu={this.props.sideBarMenu} projectList={projectList} userInfo={user} />
        <RightBar>
          <Tabs>
            {
              rightbarTabs.map((v,k)=>{
                return (
                  <Tabpage key={`tabs-${k}`} icon={v.icon}>
                    <List list={rightbarTabLists} name={v.name} />
                  </Tabpage>
                )
              })
            }
          </Tabs>
        </RightBar>
      </aside>
    );
  }
}
