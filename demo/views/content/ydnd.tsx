import * as React from 'react';

export default class Ydnd extends React.Component<any,any>{
  refs:any;
  constructor(props){
    super(props);
  }
  componentDidMount(){
    
  };
  componentWillUnmount(){
    
  };

  render(){
    return(
      <div ref="ydnd" className="ydnd">
        {this.props.children}
      </div>
    );
  }
};