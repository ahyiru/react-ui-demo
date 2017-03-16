import * as React from 'react';

import {ysort,yunique} from '../../../configs/tools';

import './func.less';

import Row from '../base/row';
import Col from '../base/col';
import Input from '../base/input';

export default class Autocomplete extends React.Component<any,any> {
	timer:number;
	constructor(props){
    super(props);
    this.timer=0;
    this.state=({
    	data:yunique(this.props.data),
    	sv:'',
  		result:[],
  		selected:[],

  		test:'',
  		cls:'',
    })
  };

  componentDidMount(){
		let t=this.state.data.sort(ysort);
		console.log(this.props.data);
		console.log(t);
  };
  componentWillUnmount(){
  	
  };
  getValue=(e)=>{
		let sv=e.target.value;

		if(this.timer){
  		clearTimeout(this.timer);
  	}
  	let newArr=[];
  	let that=this;
  	this.timer=setTimeout(function(){
  		if(sv){
		  	let reg=new RegExp(sv,'i');
		  	that.state.data.map((v:any,k)=>{
		  		// v+='';
		  		if(reg.test(v)){
		  			newArr.push(v);
		  		}
		  	});
		  }
		  else{
		  	newArr=[];
		  }
	  	// console.log(newArr);
	  	that.setState({
	  		result:newArr,
  			selected:[]
	  	});
  	},200);

	  this.setState({
  		sv:sv
  	});
	};

	selected=(e)=>{
		this.setState({
			sv:e.target.innerHTML,
  		result:[],
		  selected:[]
  	});
	};

	mouseEnter=(e)=>{
		let newArr=this.state.result;
		let selected=[];
		newArr.map((v,k)=>{
			selected[k]=false;
			if(v==e.target.innerHTML){
				selected[k]=true;
			}
		});
		this.setState({
			selected:selected
  	});
	};

	keyEvent=(e)=>{
		let k=e.which||e.keyCode;
		let newArr=this.state.result;
		let selected=this.state.selected;
		let f=false;
		switch(k){
			case 38:
				newArr.map((v,k)=>{
					if(!f){
						if(selected[k]){
							selected[k]=false;
							if(k==0) k=newArr.length;
							selected[k-1]=true;
							f=true;
						}
					}
				});
				if(!f) selected[newArr.length-1]=true;
				this.setState({
					selected:selected
		  	});
				break;
			case 40:
				newArr.map((v,k)=>{
					if(!f){
						if(selected[k]){
							selected[k]=false;
							if(k==newArr.length-1) k=-1;
							selected[k+1]=true;
							f=true;
						}
					}
				});
				if(!f) selected[0]=true;
				this.setState({
					selected:selected
		  	});
				break;
			case 13:
				var sv;
				newArr.map((v,k)=>{
					if(selected[k]){
						sv=v;
					}
				});
				this.setState({
					sv:sv,
		  		result:[],
		  		selected:[]
		  	});
				break;
		}
	};

	test=(e)=>{
		this.setState({
			test:e.target.value,
		})
	};
	focus=(e)=>{
		this.setState({
			cls:' focus',
		})
	};
	blur=(e)=>{
		this.setState({
			cls:'',
		})
	};

  render() {
  	const {sv,result,selected,test,cls}=this.state;
    return (
      <div className="y-autocomplete">
        <h2>{this.props.title}</h2>
        <Row gutter={12}>
	        <Col span={4}>
	        	<Input type="text" value={sv} change={this.getValue} keyup={this.keyEvent} />
	        	{
	        		!!result.length&&<ul onClick={this.selected}>
	        			{
	        				result.map((v,k)=>{
	        					return (
	        						<li className={selected[k]?'selected':''} key={`r-${k}`} onMouseEnter={this.mouseEnter}>{v}</li>
	        					)
	        				})
	        			}
	        		</ul>
	        	}
        	</Col>
        	<Col span={4}>
        		<div className={`test${cls}`}>
		        	<Input type="text" value={test} iright="angle-up" change={this.test} focus={this.focus} blur={this.blur} />
		        	<ul className="anim">
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
