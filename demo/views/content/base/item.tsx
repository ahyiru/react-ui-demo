import * as React from 'react';

export interface ItemsProps {
  style?:any;
};
export interface ItemProps {
  border?:string;
};

export default class Items extends React.Component<ItemsProps,any> {
  static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    style:React.PropTypes.object,
  };
  static defaultProps={
    style:null,
  };
  render() {
    return (
      <div className="y-items" style={this.props.style}>
        {this.props.children}
      </div>
    )
  };
};

export class Item extends React.Component<ItemProps,any> {
  static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    border:React.PropTypes.string,
  };
  static defaultProps={
    border:null,
  };
  render() {
    return (
      <div className="y-item" style={{border:this.props.border}}>
        {this.props.children}
      </div>
    )
  };
};
