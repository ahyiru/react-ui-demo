import * as React from 'react';

import Autocomplete from './autocomplete';

var data=['1',1,'www','3e3',234,'aa','中国','武汉','wuhan','湖南','湖北','&66','@qq3'];
var title='autocomplete--支持鼠标点选和键盘上下移动回车选择';

export default class Func2 extends React.Component<any,any> {
	constructor(props){
    super(props);
  };

  render() {
    return (
      <Autocomplete data={data} title={title} />
    )
  };
}
