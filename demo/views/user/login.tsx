import * as React from 'react';

export default class Login extends React.Component<any,any> {
	static contextTypes={
    router:React.PropTypes.object
  };
	constructor(props){
		super(props);
    this.state=({
      title:'登录',
      mval:'',
      pval:'',
      passwdType:'password'
    })
	};
	componentDidMount=()=>{

	};
	login=()=>{
		/*var name=document.getElementById('username').value;
    var password=document.getElementById('password').value;
    var data={
      name:name,
      password:password
    };
    var path='/';
    let users=JSON.parse(localStorage.getItem('users'));
    if(users){
      var f=true;
      users.map((v,k)=>{
        if(v.name==name&&v.password==password){
          localStorage.setItem('curUser',name);
          this.context.router.push(path);
          f=false;
          return false;
        }
      })
      if(f) alert('用户名或密码错误！');
    }
    else{
      this.context.router.push('info/signup');
      return true;
    }
    console.log('err');*/
    localStorage.setItem('login','admin');
    this.context.router.push('/');
	};

  getEmail=(e)=>{
    this.setState({
      mval:e.target.value
    })
  };
  getPasswd=(e)=>{
    this.setState({
      pval:e.target.value
    })
  };

  changeType=()=>{
    this.setState({
      passwdType:this.state.passwdType=='password'?'text':'password'
    })
  };

  resetVal=()=>{
    this.setState({
      mval:''
    })
  };

  render() {
    const{mval,pval,passwdType}=this.state;
    return(
    		<form>
          <h4>{this.state.title}</h4>
          <div className="log-input">
            <input type="text" placeholder="邮箱" value={mval} onChange={this.getEmail} />
            {mval?<i className="fa fa-times-circle" onClick={this.resetVal}></i>:''}
          </div>
          <div className="log-input">
            <input type={passwdType} placeholder="密码" value={pval} onChange={this.getPasswd} />
            {pval?<i className="fa fa-eye" onClick={this.changeType}></i>:''}
          </div>
          <div className="log-input">
    			  <button className="ybtn ybtn-success ybtn-block" onClick={this.login}>登录</button>
          </div>
          <div className="log-input">
            <a className="find-pwd" href="#/user/signup">忘记密码</a>
            <a className="reg-user" href="#/user/signup">免费注册</a>
          </div>
          <div className="other-log">
            <div className="other-txt">
              <span>第三方登录</span>
            </div>
            <div className="other-ico">
              <i className="fa fa-qq"></i>
              <i className="fa fa-weibo"></i>
              <i className="fa fa-weixin"></i>
            </div>
          </div>
    		</form>
    )
  }
}