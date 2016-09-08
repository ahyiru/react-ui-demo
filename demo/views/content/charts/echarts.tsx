import * as React from 'react';

import YEcharts from './yEcharts';

import {chart1,chart2} from '../../../models/echarts';

interface ecProps {
  
}

export default class Echarts extends React.Component<ecProps,any> {
  timeTicket:number;
  count:number;
	constructor(props){
    super(props);
    this.timeTicket=null;
    this.count=51;
    this.state=({
    	option:chart1,
    	option2:chart2
    });
  };
  fetchNewDate=()=>{
    let axisData = (new Date()).toLocaleTimeString().replace(/^\D*/,'');
    let option = this.state.option;
    let data0 = option.series[0].data;
    let data1 = option.series[1].data;
    data0.shift();
    data0.push(Math.round(Math.random() * 1000));
    data1.shift();
    let r:any=Math.random() * 10 + 5;
    data1.push(r.toFixed(1) - 0);

    option.xAxis[0].data.shift();
    option.xAxis[0].data.push(axisData);
    option.xAxis[1].data.shift();
    option.xAxis[1].data.push(this.count++);
    this.setState({option:option});
  };
  componentDidMount=()=>{
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
    this.timeTicket = setInterval(this.fetchNewDate, 1000);
  };
  componentWillUnmount=()=>{
    if (this.timeTicket) {
      clearInterval(this.timeTicket);
    }
  };

  onChartClick=(param,echart)=>{
    console.log(param, echart);
    alert('图表点击!');
  };
  onChartLegendselectchanged=(param,echart)=>{
    console.log(param, echart);
    alert('改变选中项!');
  };
  onChartReady=(echart)=>{
    console.log('图表已加载!', echart);
  };

  render() {
  	let onEvents={
      'click': this.onChartClick,
      'legendselectchanged': this.onChartLegendselectchanged
    };
    return (
      <div className="y-items">
      	<div className="y-item">
	        <span>Echarts</span>
	        <YEcharts ref='echarts_react' option={this.state.option} style={{height: 300}} />
	      </div>
	      <div className="y-item">
	        <span>Echart1</span>
	        <YEcharts option={this.state.option2} style={{height: 300}} onChartReady={this.onChartReady} onEvents={onEvents} />
	      </div>
      </div>
    )
  };
}
