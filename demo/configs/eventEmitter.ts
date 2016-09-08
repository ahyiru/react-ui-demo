const EventEmitter={
  _events:{},
  dispatch:function(event,data){
    if(!this._events[event]){
      return; //没有监听事件
    }
    for(var i=0;i<this._events[event].length;i++){
      this._events[event][i](data);
    }
  },
  subscribe:function(event,callback){
    if(!this._events[event]){
      this._events[event]=[]; //创建新事件数组
    }
    this._events[event].push(callback);
  },
  unSubscribe:function(event){
    if(this._events&&this._events[event]){
      delete this._events[event]; //事件解绑
      console.log('解绑成功！');
   }
  }
};
export default EventEmitter;

/*class subTest extends React.Component{
  constructor(props){
    super(props);
  }
  componentDidMount=()=>{
    var self=this;
    EventEmitter.subscribe('subTest',(val)=>{
      console.log(val);
    });
  }
  componentWillUnmount=()=>{
    EventEmitter.unSubscribe('subTest');
  }
}

class pubTest extends React.Component{
  constructor(props){
    super(props);
  }
  showNotify=(direction)=>{
    EventEmitter.dispatch('subTest',direction);
  }
}*/

