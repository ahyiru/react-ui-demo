import * as React from 'react';

export interface PageHeaderProps {
  breadcrumb?:any;
  hidePagetitle?:boolean;
};

export default class PageHeader extends React.Component<any,any> {

  state={auth:'yiru'};
  static propTypes={
    breadcrumb:React.PropTypes.array,
    hidePagetitle:React.PropTypes.bool,
  };
  static defaultProps={
    hidePagetitle:false,
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
    let l=breadcrumb.length;
    let cpage=breadcrumb[l-1]&&breadcrumb[l-1].cpage;
    return (
      <div className="y-pageheader">
        {
          (!cpage&&!hidePagetitle)&&
            <h2>
              {
                breadcrumb.length>0?breadcrumb.map((v,k)=>{
                  return <span key={`title-${k}`}> {v.title} </span>;
                }):
                <span> 主页 </span>
              }
            </h2>
        }
        <div className="y-page-bar">
          {
            cpage?
            <div className="y-page-header">
              <a href={breadcrumb[l-2].url}><i className="fa fa-angle-left"></i> 返回</a>
              <h2>{breadcrumb[l-1].title}</h2>
            </div>:
            <ul className="y-page-breadcrumb">
              <li>
                <a href="#"><i className="fa fa-home"></i></a>
              </li>
              {
                breadcrumb.map((v,k)=>{
                  return <li key={`bread-${k}`}><a href={v.url}>{v.title}</a></li>;
                })
              }
            </ul>
          }
        </div>
      </div>
    );
  }
}
