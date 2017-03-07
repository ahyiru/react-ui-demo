import * as React from 'react';
import {isAuthed,getUser,rmUser,rmToken} from '../../servers/storage';
import List from '../aside/list';

export interface NavProps {
  name?:string;
  icon?:string;
  img?:string;
  animate?:string;
  msg?:string;
  open?:string;
  items?:any;
  getCur?:any;
};

export default class DropDown extends React.Component<NavProps,any> {
  static path='/';
  static propTypes={
    name:React.PropTypes.string,
    icon:React.PropTypes.string,
    img:React.PropTypes.string,
    animate:React.PropTypes.string,
    msg:React.PropTypes.string,
    open:React.PropTypes.string,
    items:React.PropTypes.array,
    getCur:React.PropTypes.func,
  };
  static defaultProps={
    open:'',
    animate:'up',
    img:'',
  };
  static contextTypes={
    router:React.PropTypes.object
  };

  toggleDrop=(e)=>{
    e.stopPropagation();
    this.props.getCur(this.props.name);
    /*this.setState({
      open:this.state.open?'':'open',
    });*/
  };

  listClick=(name,v)=>{
    if(name=='profile'){
      // localStorage.removeItem('login');  // 删除login缓存
      // localStorage.clear();  // 删除所有缓存
      rmUser();
      rmToken();
      this.context.router.push(v.url);
    }
  };

  render() {
    const {name,icon,img,animate,msg,open,items}=this.props;
    const anim=`fade-in-${animate}`;
    return (
      <li className={`y-dropdown ${name} ${open}`} onClick={this.toggleDrop}>
        {
          img?
          <a href="javascript:;" className="img">
            <span className="username">{(isAuthed()&&getUser().name)||'admin'}</span>
            <img src={img} />
          </a>:
          <a href="javascript:;">
            <i className={`fa fa-${icon}`}></i>
            {msg&&<span className="y-badge">{msg}</span>}
          </a>
        }
        <div className={`y-dropdown-menu ${anim}`}>
          {
            (name=='theme')?
              <article className="y-lists">
                <h4 className="y-list-title">{name}</h4>
                {
                  items.map((v,k)=>{
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
                  })
                }
              </article>:<List list={items} name={name} click={this.listClick} />
          }
        </div>
      </li>
    );
  }
}
