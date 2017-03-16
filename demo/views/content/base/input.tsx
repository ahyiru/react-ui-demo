import * as React from 'react';

export type inputType='text'|'textarea';

export interface InputProps {
  type?:inputType;
  disabled?:boolean;
  readOnly?:boolean;
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
  mouserenter?:React.FormEventHandler<any>;
  mouseleave?:React.FormEventHandler<any>;
  keydown?:React.FormEventHandler<any>;
  keyup?:React.FormEventHandler<any>;
  click?:React.FormEventHandler<any>;
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
    mouserenter:React.PropTypes.func,
    mouseleave:React.PropTypes.func,
    keydown:React.PropTypes.func,
    keyup:React.PropTypes.func,
    click:React.PropTypes.func,
    disabled:React.PropTypes.bool,
    readOnly:React.PropTypes.bool,
  };
  static defaultProps={
    type:'text',
    disabled:false,
    readOnly:false,
    ileft:'',
  };

  render() {
  	let {type,disabled,readOnly,placeholder,value,defaultValue,ileft,iright,pleft,pright,error,noBorder,change,focus,blur,click,mouserenter,mouseleave,keyup}=this.props;
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
        <input type={tp} name={name} placeholder={placeholder} disabled={disabled} readOnly={readOnly} value={value} onClick={click} onChange={change} onFocus={focus} onMouseEnter={mouserenter} onMouseLeave={mouseleave} onKeyUp={keyup} onBlur={blur} />
        {iright&&<i className={`fa fa-${iright}`}></i>}
        {ileft&&<i className={`fa fa-${ileft} il`}></i>}
        {pright&&<span className="rspan">{pright}</span>}
      </div>
    )
  };
}
