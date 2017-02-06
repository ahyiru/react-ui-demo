import * as React from 'react';

import dnd from './ydrag';

export default class Ydnd extends React.Component<any,any>{
  refs:any;
  constructor(props){
    super(props);
  }
  componentDidMount(){
    dnd.init();
  };
  componentWillUnmount(){
    dnd.distroy();
  };

  render(){
    return(
      <div ref="ydnd" className="ydnd">
        {this.props.children}
      </div>
    );
  }
};