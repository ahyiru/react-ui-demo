import * as React from 'react';

import './func.less';

import draw from './draw';

export default class Func1 extends React.Component<any,any> {
	constructor(props){
    super(props);
  };

  componentDidMount(){
		var img=require('./1.jpg');
		draw.init(img);
  };
  componentWillUnmount(){
  	draw.distroy();
  };
  render() {
    return (
      <div className="y-canvas">
        <h2>canvas draw picture</h2>
        <div className="c-toolbar">
					<button className="ybtn ybtn-info" id="color">color</button>
					<button className="ybtn ybtn-success" id="size">size</button>
					<button className="ybtn ybtn-danger" id="eraser">eraser</button>
					<button className="ybtn ybtn-warning" id="text">text</button>

					<button className="ybtn ybtn-info" id="clean">clean</button>
					<button className="ybtn ybtn-success" id="pre">撤销</button>
					<button className="ybtn ybtn-danger" id="next">重做</button>
					<button className="ybtn ybtn-warning" id="save">保存</button>
				</div>
				<div id="note" className="y-hide">
					<textarea id="txtArea" colSpan={50} rowSpan={5}></textarea>
				</div>

				<div className="c-area">
					<canvas id="imgCanvas"></canvas>
					<canvas id="canvas"></canvas>
				</div>
      </div>
    )
  };
}
