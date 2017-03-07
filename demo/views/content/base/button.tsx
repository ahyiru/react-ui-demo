import * as React from 'react';
import Icon from './icon';

export type ButtonColor='default'|'info'|'warning'|'success'|'danger';
export type ButtonSize='sm'|'lg';

export interface ButtonProps {
  color?:ButtonColor;
  block?:boolean;
  size?:ButtonSize;
  icon?:string;
  text?:string;
  margin?:string;
  pullRight?:boolean;
  click?:React.FormEventHandler<any>;
  disabled?:boolean;
  type?:string;
};

export default class Button extends React.Component<ButtonProps,any> {
  static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    color:React.PropTypes.string,
    size:React.PropTypes.oneOf(['lg','default','sm']),
    type:React.PropTypes.oneOf(['submit','button','reset']),
    click:React.PropTypes.func,
    pullRight:React.PropTypes.bool,
    icon:React.PropTypes.string,
  };
  static defaultProps={
    color:'default',
    disabled:false,
    type:'button',
  };
  static contextTypes={
    router:React.PropTypes.object
  };
  componentWillReceiveProps=(nextProps)=>{

  };

  render() {
  	const {color,block,size,icon,text,margin,click,type,pullRight,disabled}=this.props;
  	const cl=color?` ybtn-${color}`:` ybtn-default`;
  	const sz=color?` ybtn-${size}`:'';
  	const bl=block?` ybtn-block`:'';
  	const mg=margin?` ${margin}`:'';
    const tp=type||'button';
    const pr=pullRight?' y-right':'';
    return (
    	<button type={tp} className={`ybtn${cl}${sz}${bl}${mg}${pr}`} onClick={click} disabled={disabled}>
    		{icon&&<Icon fa={icon} />}
    		{text}
    	</button>
    )
  };
}
