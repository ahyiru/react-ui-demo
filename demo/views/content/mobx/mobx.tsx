import * as React from 'react';

// import {observable,action,computed,autorun,useStrict} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import './mobx.less';

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
};

const store=new Store('huy');*/

@observer
export default class Mobx extends React.Component<any,any> {
  constructor(props){
    super(props);
  };

  onTest=()=>{
    this.props.store.fun1();
    this.props.store.doSomething(0,'huy'+this.props.store.todos[0].count);
  };

  render() {
    console.log(this.props.store.todos[0].count);
    return (
      <div>
        <span>MobxDemo --{this.props.store.todos[0].title}</span>
        <div>
          <button onClick={this.onTest}>测试: {this.props.store.todos[0].count}</button>
        </div>
        {/*<DevTools />*/}
      </div>
    )
  };
};
