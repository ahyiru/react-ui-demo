// import * as React from 'react';

import {observable,action,computed,autorun,reaction,useStrict} from 'mobx';
// import {observer} from 'mobx-react';
// import DevTools from 'mobx-react-devtools';

// import './mobx.less';

// 如果使用useStrictapi开启了严格模式，就必须通过action才能修改状态(state)，直接修改值会报错。
// useStrict(true);

export default class Store{
  @observable todos=[{
    title:'test',
    count:0,
    done:false,
  }];
  @action doSomething(index,title){
    this.todos[index].title=title;
    console.log('action:',this.todos[0].count);
  };
  @computed get someValue(){
    console.log('computed:',this.todos[0].title);
    return this.todos[0].title;
  };
  // autorun(()=>console.log(this.todos[0].count));
  constructor(name){
    this.todos[0].title=name;
  };
  fun1=()=>{
    console.log('fun1:',this.todos[0].count);
    this.todos[0].count++;
  };
  fun2=()=>{
    autorun(()=>console.log('autorun:',this.todos[0].count));
    reaction(
      ()=>this.todos.length,
      length=>console.log('reaction:',this.todos.map(todo=>todo.title).join(', '))
    );
    console.log('fun2:',this.todos[0].count);
  };
};

/*const store=new Store('huy');

@observer
export default class MobxDemo extends React.Component<any,any> {
  constructor(props){
    super(props);
  };

  onTest=()=>{
    store.autorun();
  };

  render() {
    console.log(store.todos[0].count);
    return (
      <div>
        <span>MobxDemo</span>
        <button onClick={this.onTest}>
          测试: {store.todos[0].count}
        </button>
        <DevTools />
      </div>
    )
  };
};*/
