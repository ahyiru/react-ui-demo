import * as React from 'react';

import Row from './row';
import Col from './col';
import Input from './input';

export interface FormProps {
  horizontal?:boolean;
};

export interface FormItemProps {
  label?:string;
  inputOpt?:any;
};

export default class Form extends React.Component<FormProps,any> {
  static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    horizontal:React.PropTypes.bool,
  };
  static defaultProps={
    horizontal:false,
  };
  render() {
    const {horizontal}=this.props;
    const h=horizontal?' yfh':''
    return (
      <form className={`y-form${h}`}>
        {this.props.children}
      </form>
    )
  };
};

export class FormItem extends React.Component<FormItemProps,any> {
  static auth='yiru';
  state={inputOpt:this.props.inputOpt};
  static propTypes={
    label:React.PropTypes.string,
    inputOpt:React.PropTypes.object,
  };
  static defaultProps={
    
  };
  focusEvent=()=>{
    const {inputOpt}=this.state;
    inputOpt.error=null;
    this.setState({
      inputOpt:inputOpt
    });
  };
  render() {
    const {label}=this.props;
    const {inputOpt}=this.state;
    return (
      <div className="yform-group">
        <label>{label}</label>
        <Input {...inputOpt} focus={this.focusEvent} />
        {inputOpt.error&&<span className="error">{inputOpt.error}</span>}
      </div>
    )
  };
};
