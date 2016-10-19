import * as React from 'react';

import './form.less';

import drag from './drag';

export default class Yform1 extends React.Component<any,any> {

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

    return (
      <div>
      	<form className="y-form1">
          <h2>表单测试页面--将左边list拖动到右边</h2>
          <div className="y-row">
            <div className="form-left">
              <ul className="draglist">
                <li>test1</li>
                <li>test2</li>
                <li>test3</li>
                <li>test4</li>
                <li>test5</li>
                <li>test6</li>
                <li>test7</li>
                <li>test8</li>
              </ul>
            </div>
            <div className="form-right">
              <div className="droplist">
                <span>条件1:</span>
                <div className="drop">
                  <span>111<i>x</i></span>
                  <span>222<i>x</i></span>
                </div>
              </div>
              <div className="droplist">
                <span>条件2:</span>
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
