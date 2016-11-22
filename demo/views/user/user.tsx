import * as React from 'react';

import './user.less';


export default class User extends React.Component<any,any> {

	constructor(props){
    super(props);
  };

  componentDidMount=()=>{
  	var h=document.body.offsetHeight;
  	console.log(h);
  	var user:any=document.getElementsByClassName('user')[0];
  	user.style.height=h+'px';
  };

  render() {
    return(
    	<div className="user">
    		<h4>login test</h4>
    		<div>{this.props.children}</div>
    	</div>
    )
  }
}