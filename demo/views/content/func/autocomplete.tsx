import * as React from 'react';

import {ysort,yunique} from '../../../configs/tools';

import './func.less';

export default class Autocomplete extends React.Component<any,any> {
	timer:number;
	constructor(props){
    super(props);
    this.timer=0;
    this.state=({
    	data:yunique(this.props.data),
    	sv:'',
  		result:[],
  		selected:[]
    })
  };

  componentDidMount(){
		let t=this.state.data.sort(ysort);
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

  render() {
  	const {sv,result,selected}=this.state;
    return (
      <div className="y-autocomplete">
        <h2>{this.props.title}</h2>
        <div className="input-area">
        	<input className="y-input" type="text" value={sv} onChange={this.getValue} onKeyUp={this.keyEvent} />
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
        </div>
      </div>
    )
  };
}
