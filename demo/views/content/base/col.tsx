import * as React from 'react';

export interface ColProps {
  span?:number;
  offset?:number;
};

export default class Col extends React.Component<ColProps,any> {
	static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    span:React.PropTypes.number,
    offset:React.PropTypes.number,
  };
  static defaultProps={
    offset:0,
  };
  render() {
  	const {span,offset}=this.props;
    const sp=span?`ycol-${span}`:``;
    const os=offset?` yoffset-${offset}`:``;
    return (
      <div className={`${sp}${os}`}>
        {this.props.children}
      </div>
    )
  };
}
