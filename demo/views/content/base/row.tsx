import * as React from 'react';

export interface RowProps {
  gutter?:number;
};

export default class Row extends React.Component<RowProps,any> {
	static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    gutter:React.PropTypes.number,
  };
  static defaultProps={
    gutter:null,
  };
  render() {
  	const {gutter}=this.props;
    const gt=gutter?` gutter-${gutter}`:``;
    return (
      <div className={`yrow${gt}`}>
        {this.props.children}
      </div>
    )
  };
}
