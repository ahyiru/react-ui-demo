import * as React from 'react';

export interface RadioProps {
  style?:any;
  placeholder?:string;
};

export default class Textarea extends React.Component<RadioProps,any> {
  static auth='yiru';
  state={auth:'yiru'};
  static propTypes={
    style:React.PropTypes.object,
    placeholder:React.PropTypes.string,
  };
  static defaultProps={
    placeholder:'',
  };
  render() {
    const {style,placeholder}=this.props;
    return (
      <textarea className="form-style" placeholder={placeholder} style={style}></textarea>
    )
  };
};

