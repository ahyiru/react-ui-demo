import * as React from 'react';
const echarts=require('echarts');

export default class Yecharts extends React.Component<any,any> {
  refs:any;
  static propTypes={
    option: React.PropTypes.object.isRequired,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,
    onChartReady: React.PropTypes.func,
    showLoading: React.PropTypes.bool,
    onEvents: React.PropTypes.object
  };
  constructor(props){
    super(props);
  }
  componentDidMount(){
    let echartObj=this.renderEchartDom();
    let onEvents=this.props.onEvents||[];
    for(let eventName in onEvents){
      if(typeof eventName==='string'&&typeof onEvents[eventName]==='function'){
        echartObj.on(eventName,function(param){
          onEvents[eventName](param,echartObj);
        });
      }
    }
    if(typeof this.props.onChartReady==='function'){
      this.props.onChartReady(echartObj);
    }
    window.addEventListener('resize',()=>{
      echartObj.resize();
    });
  };
  componentDidUpdate() {
    this.renderEchartDom();
  };
  componentWillUnmount() {
    echarts.dispose(this.refs.echartsDom);
  };
  renderEchartDom=()=>{
    let echartObj=this.getEchartsInstance();
    echartObj.setOption(this.props.option);
    if(this.props.showLoading){
      echartObj.showLoading();
    }
    else{
      echartObj.hideLoading();
    }
    return echartObj;
  };
  getEchartsInstance=()=>{
    return echarts.getInstanceByDom(this.refs.echartsDom)||echarts.init(this.refs.echartsDom,this.props.theme);
  };
  render() {
    let style = this.props.style || {height: '300px'};
    return (
      <div ref='echartsDom' className={this.props.className} style={style} />
    );
  }
};