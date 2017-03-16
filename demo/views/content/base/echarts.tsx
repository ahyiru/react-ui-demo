import * as React from 'react';
const echarts=require('echarts');

import $resize from '../../../tools/$resize';

export interface ButtonProps {
  option?:any;
  notMerge?:boolean;
  lazyUpdate?:boolean;
  style?:any;
  className?:string;
  theme?:string;
  onChartReady?:any;
  showLoading?:boolean;
  onEvents?:any;
};

export default class Echarts extends React.Component<any,any> {
  refs:any;
  static propTypes={
    option: React.PropTypes.object.isRequired,
    notMerge: React.PropTypes.bool,
    lazyUpdate: React.PropTypes.bool,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
    theme: React.PropTypes.string,
    onChartReady: React.PropTypes.func,
    showLoading: React.PropTypes.bool,
    onEvents: React.PropTypes.object
  };
  static defaultProps={
    notMerge:false,
    lazyUpdate:false,
    style:{height:'300px'},
  };
  componentDidMount(){
    let echartObj=this.renderEchartDom();
    let onEvents=this.props.onEvents||{};
    this.bindEvents(echartObj,onEvents);
    if(typeof this.props.onChartReady==='function'){
      this.props.onChartReady(echartObj);
    }
    $resize(this.refs.echartsDom,this.resizeEvent).resize();
  };
  resizeEvent=()=>{
    this.renderEchartDom().resize();
  };
  componentDidUpdate() {
    this.renderEchartDom();
    this.bindEvents(this.getEchartsInstance(),this.props.onEvents||[]);
  };
  componentWillUnmount() {
    echarts.dispose(this.refs.echartsDom);
    $resize(this.refs.echartsDom,this.resizeEvent).unbind(); //路由跳转后此dom绑定的事件变量自动回收
  };
  bindEvents(instance,events) {
    var _loop=function _loop(eventName) {
      if (typeof eventName==='string'&&typeof events[eventName]==='function'){
        instance.off(eventName);
        instance.on(eventName,function(param){
          events[eventName](param,instance);
        });
      }
    };
    for (var eventName in events){
      _loop(eventName);
    }
  };
  renderEchartDom=()=>{
    let echartObj=this.getEchartsInstance();
    echartObj.setOption(this.props.option,this.props.notMerge||false,this.props.lazyUpdate||false);
    if(this.props.showLoading){
      echartObj.showLoading();
    }else{
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