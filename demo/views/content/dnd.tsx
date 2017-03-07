import * as React from 'react';

import dnd from '../../tools/dnd';

export default class Dnd extends React.Component<any,any>{

  componentDidMount(){
    dnd.init();
  };
  componentWillUnmount(){
    dnd.distroy();
  };

  render(){
    return(
      <div className="ydnd">
        <div className="ydrop">
          {this.props.children}
        </div>
      </div>
    );
  }
};