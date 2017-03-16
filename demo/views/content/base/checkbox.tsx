import * as React from 'react';

import {changeArr} from '../../../tools/yiru-tools';

export interface CheckboxProps {
  name?:string;
  inline?:boolean;
  opt?:any;
  checked?:any;
  change?:any;
};

export default class Checkbox extends React.Component<CheckboxProps,any> {
  static auth='yiru';
  state={
    auth:'yiru',
  };
  static propTypes={
    name:React.PropTypes.string,
    inline:React.PropTypes.bool,
    opt:React.PropTypes.array,
    checked:React.PropTypes.array,
    change:React.PropTypes.func,
  };
  static defaultProps={
    inline:false,
    checked:[],
  };
  getCkecked=(checked,e)=>{
    let result=changeArr(checked,e.target.value);
    this.props.change(result);
  };
  render() {
    let {inline,name,change,opt,checked}=this.props;
    let setChecked=(()=>{
      if(!(checked instanceof Array)) checked=[];
      opt.map((v,k)=>{
        if(checked.includes(v.label)){
          v.checked=true;
        }else{
          v.checked=false;
        }
      });
    })();
    const cls=inline?' inline':'';
    return (
      <div className={`y-radio-checkbox${cls}`} onChange={this.getCkecked.bind(this,checked)}>
        {
          opt.map((v,k)=>{
            return  <label key={`checkbox-${k}`} className="checkbox">
                      <input name={name} value={v.label} type="checkbox" checked={v.checked||false} disabled={v.disabled} />
                      <span>{v.label}</span>
                    </label>
          })
        }
      </div>
    )
  };
};

