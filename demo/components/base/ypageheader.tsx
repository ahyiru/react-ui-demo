import * as React from 'react';

export default class YpageHeader extends React.Component<any,any> {

	constructor(props){
    super(props);
  };

  render() {
  	const {breadcrumb,hidePagetitle}=this.props;
    let setBreadcrumb=(d)=>{
      // let breadcrumb=`<li><a href="javascript:;">${data.subTitle}</a></li>`;
      /*for(let i=1;i<d.level;i++){
        return <li><a href={d.url}>{d.subTitle}</a></li>;
      }*/
      if(d.level>1){
        let sub=d;
        sub.level=d.level-1;
        setBreadcrumb(sub);
        return <li><a href={d.url}>{d.subTitle}</a></li>;
      }
    };
    return (
      <div className="y-pageheader">
        {
          !hidePagetitle&&
            <h2>
              {
                breadcrumb.map((v,k)=>{
                  return <span key={`title-${k}`}> {v.title} </span>;
                })
              }
            </h2>
        }
        <div className="y-page-bar">
          <ul className="y-page-breadcrumb">
            <li>
              <a href="#"><i className="fa fa-home"></i></a>
            </li>
            {
              breadcrumb.map((v,k)=>{
                return <li key={`bread-${k}`}><a href={k==0?'javascript:;':v.url}>{v.title}</a></li>;
              })
            }
          </ul>
          <article className="y-timer"></article>
        </div>
      </div>
    );
  }
}
