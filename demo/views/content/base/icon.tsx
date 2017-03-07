import * as React from 'react';


export interface IconProps {
  fa?:string;
  color?:string;
  size?:string;
  click?:React.FormEventHandler<any>;
};

export default class Icon extends React.Component<IconProps,any> {
	static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    fa:React.PropTypes.string,
    color:React.PropTypes.string,
    size:React.PropTypes.string,
    click:React.PropTypes.func,
  };
  static defaultProps={
    // color:'transparent',
    size:null,
  };
  render() {
  	const {fa,click,size,color}=this.props;
  	const sz=size?` fa-${size}`:``;
    return (
    	<i className={`fa fa-${fa}${sz}`} style={{color:color}} onClick={click}></i>
    )
  };
}
