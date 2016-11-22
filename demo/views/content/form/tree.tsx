import * as React from 'react';

/*import { Tree } from 'antd';

import './treeDrag.less';

import drag from './dragTree';

const TreeNode = Tree.TreeNode;

const x = 3;
const y = 2;
const z = 1;
const tData = [];

const generateData:any = (_level, _preKey, _tns) => {
  const preKey = _preKey || '0';
  const tns = _tns || tData;

  const children = [];
  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({ title: key, key });
    if (i < y) {
      children.push(key);
    }
  }
  if (_level < 0) {
    return tns;
  }
  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};
generateData(z);*/

export default class Treedrag extends React.Component<any,any> {

	constructor(props){
    super(props);
    /*this.state=({
    	tData:tData,
      expandedKeys:['0-0', '0-0-0', '0-0-0-0']
    });*/
  };

  componentDidMount=()=>{
    // drag.init();
  };
  componentWillUnmount=()=>{
    // drag.distroy();
  };


  render() {
    /*const {expandedKeys,tData}=this.state;
    const loop=data=>data.map((v,k)=>{
      if(v.children&&v.children.length){
        return <TreeNode key={v.key} title={v.key}>{loop(v.children)}</TreeNode>;
      }
      return <TreeNode key={v.key} title={v.key} />;
    });*/
    return (
      <div>
      	{/*<form className="y-dragtree">
                  <h2>tree drag</h2>
                  <div className="y-row">
                    <div className="form-left">
                      <Tree defaultExpandedKeys={expandedKeys}>
                        {loop(tData)}
                      </Tree>
                    </div>
                    <div className="form-right">
                      <div className="droplist">
                        <span>111</span>
                        <div className="drop">
                          <span>111<i className="fa fa-times-circle"></i></span>
                          <span>222<i className="fa fa-times-circle"></i></span>
                        </div>
                      </div>
                      <div className="droplist">
                        <span>222</span>
                        <div className="drop">
                          
                        </div>
                      </div>
                    </div>
                  </div>
                </form>*/}
      </div>
    )
  };
}

