import * as React from 'react';

import Input from './input';

import './layout.less';

import Row from './row';
import Col from './col';

import Table from './table';

let thead=['ID','参数','说明','类型','可选值','默认值'];
let tbody=[{
  key:'type',
  expr:'输入框类型',
  type:'string',
  values:'text/textarea',
  default:'text'
},{
  key:'disabled',
  expr:'是否禁用输入',
  type:'boolean',
  values:'true/false',
  default:'false'
},{
  key:'placeholder',
  expr:'提示消息',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'value',
  expr:'输入值',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'defaultValue',
  expr:'默认值',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'ileft',
  expr:'输入框左侧图标',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'iright',
  expr:'输入框右侧图标',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'pleft',
  expr:'左边显示提示信息',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'pright',
  expr:'右边显示提示信息',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'error',
  expr:'输入是否有错误',
  type:'boolean',
  values:'true/false',
  default:'false'
},{
  key:'noBorder',
  expr:'输入框是否有边框',
  type:'boolean',
  values:'true/false',
  default:'false'
},{
  key:'change',
  expr:'监视输入事件',
  type:'function',
  values:'-',
  default:'-'
},{
  key:'focus',
  expr:'取得焦点事件',
  type:'function',
  values:'-',
  default:'-'
},{
  key:'blur',
  expr:'失去焦点事件',
  type:'function',
  values:'-',
  default:'-'
}];

export default class InputDemo extends React.Component<any,any> {
  state={
    test:''
  };
  change=(key,e)=>{
    this.setState({
      [key]:e.target.value,
    });
  };
  render() {
    return (
      <div className="input">
        <Row gutter={12}>
          <Col span={4}>
            <Input placeholder="default" />
            <Input placeholder="noBorder" noBorder={true} />
            <Input placeholder="hasError" error={true} />
            <Input disabled={true} value="disabled" />
          </Col>
          <Col span={4}>
            <Input placeholder="pleft" pleft="@" />
            <Input placeholder="pright" pright="哈哈" />
            <Input placeholder="ileft" ileft="lock" iright="user" />
            <Input placeholder="iright" iright="user" />
          </Col>
          <Col span={4}>
            <Input placeholder="pleft,pright" pleft="@" pright="**" />
            <Input placeholder="pleft,iright" pleft="@" iright="user" />
            <Input placeholder="change" value={this.state.test} change={this.change.bind(this,'test')} />
            <Input placeholder="ileft" ileft="lock" iright="user" pleft="@" pright="**" />
          </Col>
        </Row>
        <div className="">
          <h2>参数说明</h2>
          <Table thead={thead} tbody={tbody} noBorder={true} />
        </div>
      </div>
    )
  };
}
