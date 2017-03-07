import * as React from 'react';

import './form.less';

import drag from './draglist';

export default class DragList extends React.Component<any,any> {

	constructor(props){
    super(props);
    this.state=({
    	
    });
  };

  componentDidMount=()=>{
    // require('./drag');
    // let drag=require('./drag').default;
    drag.init();
  };
  componentWillUnmount=()=>{
    drag.distroy();
  };


  render() {
    const {title,dragList,dropTitle}=this.props;
    return (
      <div>
      	<form className="y-form1">
          <h2>{title}</h2>
          <div className="y-row">
            <div className="form-left">
              <ul className="draglist">
                {
                  dragList.map((v,k)=>{
                    return <li key={`list-${k}`}>{v.title}</li>
                  })
                }
              </ul>
            </div>
            <div className="form-right">
              <div className="droplist">
                <span>{dropTitle[0]}</span>
                <div className="drop">
                  <span>111<i>x</i></span>
                  <span>222<i>x</i></span>
                </div>
              </div>
              <div className="droplist">
                <span>{dropTitle[1]}</span>
                <div className="drop">
                  
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  };
}
