import * as React from 'react';

import Row from '../base/row';
import Col from '../base/col';
import Input from '../base/input';

import './func.less';

export default class Func2 extends React.Component<any,any> {
	constructor(props){
    super(props);
    this.state=({
  		test:'',
  		cls:'',
    })
  };

  componentDidMount=()=>{
    window.addEventListener('click',this.hideNav,false);
  };

  componentWillUnmount=()=>{
    window.removeEventListener('click',this.hideNav,false);
  };
  hideNav=()=>{
    this.setState({
			cls:'',
		});
  };
  test=(e)=>{
		this.setState({
			test:e.target.value,
		})
	};
	focus=(e)=>{
		e.stopPropagation();
		this.setState({
			cls:' focus',
		});
	};
	getVal=(e)=>{
		let li=e.target.tagName=='LI';
		this.setState({
			cls:'',
			test:li?e.target.innerText:'',
		});
	};

  render() {
  	const {test,cls}=this.state;
    return (
    	<div className="y-autocomplete">
	      <Row gutter={12}>
	      	<Col span={4}>
	      		<div className={`test${cls}`} onClick={e=>{e.stopPropagation()}}>
		        	<Input type="text" value={test} iright="angle-up" change={this.test} focus={this.focus} />
		        	<ul className="anim" onClick={this.getVal}>
		        		<li>1</li>
		        		<li>2</li>
		        		<li>3</li>
		        	</ul>
	        	</div>
	      	</Col>
	      </Row>
      </div>
    )
  };
}
