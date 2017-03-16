import * as React from 'react';

export interface RadioProps {
  name?:string;
  inline?:boolean;
  opt?:any;
  checked?:string;
  change?:any;
};

export default class Radio extends React.Component<RadioProps,any> {
  static auth='yiru';
  state={
    auth:'yiru',
  };
  static propTypes={
    name:React.PropTypes.string,
    inline:React.PropTypes.bool,
    opt:React.PropTypes.array,
    checked:React.PropTypes.string,
    change:React.PropTypes.func,
  };
  static defaultProps={
    inline:false,
  };
  render() {
    const {inline,name,opt,checked,change}=this.props;
    const cls=inline?' inline':'';
    return (
      <div className={`y-radio-checkbox${cls}`} onChange={change}>
        {
          opt.map((v,k)=>{
            return  <label key={`radio-${k}`} className="radio">
                      <input name={name} value={k} type="radio" readOnly checked={k==checked?true:false} disabled={v.disabled} />
                      <span>{v.label}</span>
                    </label>
          })
        }
      </div>
    )
  };
};


