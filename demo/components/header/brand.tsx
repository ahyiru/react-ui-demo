import * as React from 'react';

export interface BrandProps {
  logo?:boolean;
  title?:string;
  subtitle?:string;
};
export default class Brand extends React.Component<BrandProps,any> {

  static propTypes={
    logo:React.PropTypes.bool,
    title:React.PropTypes.string,
    subtitle:React.PropTypes.string,
  };
  static defaultProps={
    logo:false,
  };

  render() {
    const {logo,title,subtitle}=this.props;
    return (
      <section className="y-brand">
        <a href="javascript:;" className="brand"> 
          {logo&&<h4 className="logo"></h4>}
          <span><b>{title}</b> {subtitle}</span>   
        </a>
      </section>
    );
  }
}
