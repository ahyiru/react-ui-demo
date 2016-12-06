import * as React from 'react';

export default class YdropDown extends React.Component<any,any> {

  static contextTypes={
    router:React.PropTypes.object
  };
  path:any;

  constructor(props){
    super(props);
    this.path='/';
    if(this.props.name=='profile'){
      this.path=this.props.items[3].url;
    }
    
    /*this.state=({
      open:''
    });*/
  };

  toggleDrop=(e)=>{
    e.stopPropagation();
    this.props.getCur(this.props.name);
    /*this.setState({
      open:this.state.open?'':'open',
    });*/
  };

  listClick=(name)=>{
    if(name=='profile'){
      // localStorage.removeItem('login');  // 删除login缓存
      localStorage.clear();  // 删除所有缓存
      this.context.router.push(this.path);
    }
  };

  render() {
    const {name,icon,animate,msg,open,items}=this.props;
    return (
      <li className={`y-dropdown ${name} ${open}`} onClick={this.toggleDrop}>
        {
          name=='profile'&&icon.split(' ')[0]!='fa'?
          <a href="javascript:;" className="img">
            <span className="username">{localStorage.getItem('login')||'yiru'}</span>
            <img src={icon} />
          </a>:
          <a href="javascript:;">
            <i className={icon}></i>
            <span className={msg?`y-badge`:`y-hide`}>{msg}</span>
          </a>
        }
        <div className={`y-dropdown-menu `+(name==`theme`?`left `:``)+`${animate}`}>
          <article className="y-lists">
            <h4 className="y-list-title">{name}</h4>
            {
              (name=='theme')?items.map((v,k)=>{
                return(
                  <div key={name+k} className="y-list">
                    <h4>{v}</h4>
                    <ul className="theme-select">
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                )
              }):items.map((v,k)=>{
                return(
                  <div key={name+k} className="y-list" onClick={this.listClick.bind(this,name)}>
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
                      <i className="fa fa-user"></i>
                    </div>
                  </div>
                )
              })
            }
          </article>
        </div>
      </li>
    );
  }
}
