import * as React from 'react';

export default class YpageHeader extends React.Component<any,any> {

	constructor(props){
    super(props);
  };

  render() {
  	const {data}=this.props;
    return (
      <div className="y-pageheader">
        <h2>{data.title} <span> {data.subTitle}</span></h2>
        <div className="y-page-bar">
          <ul className="y-page-breadcrumb">
            <li>
              <a href="javascript:;"><i className="fa fa-home"></i> {data.title}</a>
            </li>
            <li className={data.level<2?'y-hide':''}>
              <a href="javascript:;">{data.subTitle}</a>
            </li>
            <li className={data.level<3?'y-hide':''}>
              <a href="javascript:;">{data.subTitle}</a>
            </li>
          </ul>
          <article className="y-timer"></article>
        </div>
      </div>
    );
  }
}
