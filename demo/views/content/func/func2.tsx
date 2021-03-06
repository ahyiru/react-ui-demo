import * as React from 'react';

import Row from '../base/row';
import Col from '../base/col';
import Input from '../base/input';
import Select from '../base/select';

// import './func.less';

import Autocomplete from './autocomplete';

var data=['1',1,'www','3e3',234,'aa','中国','武汉','wuhan','湖南','湖北','&66','@qq3'];
var title='autocomplete--支持鼠标点选和键盘上下移动回车选择';

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
  hideNav=(e)=>{
    // e.stopPropagation();
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
	blur=(e)=>{
		this.setState({
			cls:'',
		});
	};
	stopP=(e)=>{
		e.stopPropagation();
	};
	getVal=(e)=>{
		// e.stopPropagation();
		let li=e.target.tagName=='LI';
		this.setState({
			cls:'',
			test:li?e.target.innerText:'',
		});
	};

	getSelval=(v)=>{
		console.log(v);
	};

  render() {
  	const {test,cls}=this.state;
    return (
      <Row gutter={12}>
        <Col span={8}>
        	<Autocomplete data={data} />
      	</Col>
      	<Col span={4}>
      		<Select data={[1,2,3,4]} />
      	</Col>
      </Row>
    )
  };
}
