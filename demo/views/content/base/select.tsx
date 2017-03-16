import * as React from 'react';

import Input from '../base/input';

export interface SelectProps {
  style?:any;
  data?:any;
  readOnly?:boolean;
  disabled?:boolean;
  getSelectVal?:any;
  value?:string;
};

export default class Select extends React.Component<SelectProps,any> {
  static auth='yiru';
  state={
    cls:'',
    val:'',
  };
  static propTypes={
    style:React.PropTypes.object,
    data:React.PropTypes.array,
    value:React.PropTypes.string,
    readOnly:React.PropTypes.bool,
    disabled:React.PropTypes.bool,
    getSelectVal:React.PropTypes.func,
  };
  static defaultProps={
    style:null,
    readOnly:true,
    disabled:false,
    value:'defaultValue',
    getSelectVal:function(){},
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
  clickEvt=(e)=>{
    // e.stopPropagation();
    this.setState({
      cls:' focus',
    });
  };
  getVal=(e)=>{
    let li=e.target.tagName=='LI';
    li&&this.props.getSelectVal(e.target.innerText);
    let selVal:any=li?{
      cls:'',
      val:e.target.innerText,
    }:{
      cls:'',
    };
    this.setState(selVal);
  };
  render() {
    const {cls,val}=this.state;
    const {value,style,data,readOnly,disabled}=this.props;
    return (
      <div className={`y-select${cls}`} onClick={e=>{e.stopPropagation()}} style={style}>
        <Input defaultValue={value} value={val} iright="angle-up" click={this.clickEvt} readOnly={readOnly} disabled={disabled} />
        <ul className="selectAnim" onClick={this.getVal}>
          {
            data.map((v,k)=>{
              return <li key={`sel-${k}`}>{v}</li>
            })
          }
        </ul>
      </div>
    )
  };
};


