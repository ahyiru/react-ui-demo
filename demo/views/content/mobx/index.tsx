import * as React from 'react';

// import {observable,action,computed,autorun,useStrict} from 'mobx';
// import {observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

import Store from './store';
import Mobx from './mobx';

// import './mobx.less';

// 如果使用useStrictapi开启了严格模式，就必须通过action才能修改状态(state)，直接修改值会报错。
// useStrict(true);

/*class Store{
	@observable todos=[{
		title:'test',
    count:0,
		done:false
	}];
  @action doSomething(){
    console.log(this.todos[0].count);
  };
  @computed get someValue(){
    console.log(this.todos[0].title);
    return this.todos[0].title;
  };
  autorun=()=>{
    this.todos[0].count++;
  };
  constructor(name){
    this.todos[0].title=name;
  };
};*/

const store=new Store('huy');

// @observer
export default class MobxDemo extends React.Component<any,any> {
  /*constructor(props){
    super(props);
  };*/

  render() {
    return (
      <Mobx store={store} />
    )
  };
};
