import * as React from 'react';

import DragList from './dragList'

let dragList=[{
  title:'test1'
},{
  title:'test2'
},{
  title:'test3'
},{
  title:'test4'
},{
  title:'test5'
},{
  title:'test6'
},{
  title:'test7'
},{
  title:'test8'
},{
  title:'test9'
}];
let title='表单测试页面--将左边list拖动到右边';
let dropTitle=['条件1:','条件2:'];

export default class Yform1 extends React.Component<any,any> {

	constructor(props){
    super(props);
  };

  render() {

    return (
      <DragList dragList={dragList} title={title} dropTitle={dropTitle} />
    )
  };
}
