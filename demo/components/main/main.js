import React, { Component } from 'react';

export default class Main extends Component {

  constructor(props){
    super(props);
    this.setState({
      hover:''
    });
    window.addEventListener('click',(e)=>{
      e.stopPropagation();
      var show='';
      var st=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
      console.log('st');
      if(st>500){
        show='show';
      }
      else{
        show='';
      }
      this.setState({
        show:show
      });
    },false);
  }

  mouseEnter=()=>{
    this.setState({
      hover:'ybt-hover'
    })
  }
  mouseLeave=()=>{
    this.setState({
      hover:''
    })
  }
  backTop=()=>{
    
  }

  render() {

    const {show,hover}=this.state;

    return (
      <main>
        <section className="y-main">
          <div className="y-container">
            <div className="y-pageheader">
              <h2>标题 <span>// 副标题</span></h2>
              <div className="y-page-bar">
                <ul className="y-page-breadcrumb">
                  <li>
                    <a href="javascript:;"><i className="fa fa-home"></i> 主页</a>
                  </li>
                  <li>
                    <a href="javascript:;">一级</a>
                  </li>
                  <li>
                    <a href="javascript:;">二级</a>
                  </li>
                </ul>
                <article className="y-timer"></article>
              </div>
            </div>

            <div className="y-pagecontent">
              <button className="btn btn-success fs">全屏测试</button>
            </div>

          </div>
          
          <div className={'y-back-top '+show+' '+hover} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseEnter} onClick={this.backTop}>
            <i className="fa fa-angle-up"></i>
            <span>返回顶部</span>
          </div>
        </section>
      </main>
    );
  }
}
