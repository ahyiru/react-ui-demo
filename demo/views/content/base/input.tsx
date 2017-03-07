import * as React from 'react';

export type inputType='text'|'textarea';

export interface InputProps {
  type?:inputType;
  disabled?:boolean;
  placeholder?:string;
  value?:string;
  defaultValue?:string;
  ileft?:string;
  iright?:string;
  pleft?:string;
  pright?:string;
  error?:boolean;
  noBorder?:boolean;
  change?:React.FormEventHandler<any>;
  focus?:React.FormEventHandler<any>;
  blur?:React.FormEventHandler<any>;
};

export default class Input extends React.Component<InputProps,any> {
  static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    placeholder:React.PropTypes.string,
    value:React.PropTypes.string,
    defaultValue:React.PropTypes.string,
    type:React.PropTypes.oneOf(['text','textarea']),
    change:React.PropTypes.func,
    focus:React.PropTypes.func,
    blur:React.PropTypes.func,
  };
  static defaultProps={
    type:'text',
    disabled:false,
    ileft:'',
  };

  render() {
  	let {type,disabled,placeholder,value,defaultValue,ileft,iright,pleft,pright,error,noBorder,change,focus,blur}=this.props;
    ileft&&(pleft='');
    iright&&(pright='');
    const tp=type||'text';
  	const ic=(iright||ileft)?` input-ico`:``;
    const il=ileft?` licon`:``;
  	const bd=noBorder?` no-border`:``;
    const pl=pleft?` p-left`:``;
    const pr=pright?` p-right`:``;
    const err=error?` error`:``;
    return (
      <div className={`y-input${ic}${il}${bd}${pl}${pr}${err}`}>
        {pleft&&<span className="lspan">{pleft}</span>}
        <input type={tp} name={name} placeholder={placeholder} disabled={disabled} value={value} onChange={change} onFocus={focus}  onBlur={blur} />
        {iright&&<i className={`fa fa-${iright}`}></i>}
        {ileft&&<i className={`fa fa-${ileft} il`}></i>}
        {pright&&<span className="rspan">{pright}</span>}
      </div>
    )
  };
}
