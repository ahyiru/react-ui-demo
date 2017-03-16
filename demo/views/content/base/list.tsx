import * as React from 'react';

export interface ListProps {
  list?:any;
  click?:any;
  name?:string;
  type?:string;
};

export default class List extends React.Component<ListProps,any> {
  static propTypes={
    list:React.PropTypes.array,
    click:React.PropTypes.func,
    name:React.PropTypes.string,
    type:React.PropTypes.string,
  };
  static defaultProps={
    list:[],
    type:'',
  };
  handleClick=(name,v)=>{
    this.props.click(name,v);
  };
  render() {

    const {list,name,type}=this.props;

    return (
      <article className={`y-lists ${type}`}>
        <h4 className="y-list-title">{name}</h4>
        {
          list.map((v,k)=>{
            return(
              <div key={`list-${k}`} className="y-list" onClick={this.handleClick.bind(this,name,v)}>
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
                  <i className={`fa fa-${v.icon}`}></i>
                </div>
              </div>
            )
          })
        }
      </article>
    );
  }
}
