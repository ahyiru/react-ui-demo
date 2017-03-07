import * as React from 'react';

import Nav from './nav';

import Brand from './brand';

import {dropList} from '../../models/models';

import {hasClass} from '../../tools/dom-tools';

import {isAuthed} from '../../servers/storage';

let loginInfo={
  loginUrl:'#/user/login',
  signupUrl:'#/user/signup'
};

export default class Header extends React.Component<any,any> {

  constructor(props){
    super(props);
  };

  render() {
    let login=null;
    if(!isAuthed()){
      login=loginInfo;
    }
    return (
      <header>
        <div className="y-header">
          <Brand title="React" subtitle="UI Demo" logo={false} />
          <Nav dropList={dropList} hideRightTogbar={false} login={login} />
        </div>
      </header>
    );
  }
}
