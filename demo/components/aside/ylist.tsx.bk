import * as React from 'react';

export default class Ylist extends React.Component<any,any> {

  constructor(props:any){
    super(props);
  };

  render() {

    const {tab,list}=this.props;

    return (
      <article className={`y-tab-page y-lists ${tab.active}`}>
        <h4 className="y-list-title">{tab.name}</h4>
        {
          list.map((v,k)=>{
            return(
              <div key={`list${tab.id}${k}`} className="y-list">
                <div className="y-list-left">
                  <div className="pic">{v.pic}</div>
                </div>
                <div className="y-list-middle">
                  <div className="ylm-content">
                    <h4>{v.h4}</h4>
                    <p>{v.p}</p>
                  </div>
                </div>
                <div className="y-list-right">
                  <i className={v.rightIcon}></i>
                </div>
              </div>
            )
          })
        }
      </article>
    );
  }
}
