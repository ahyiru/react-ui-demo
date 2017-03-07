import * as React from 'react';
import './button.less';
import Button from './button';
import Icon from './icon';

import Table from './table';

let thead=['ID','参数','说明','类型','可选值','默认值'];
let tbody=[{
  key:'color',
  expr:'按钮颜色',
  type:'string',
  values:'-',
  default:'default'
},{
  key:'block',
  expr:'是否是块状按钮',
  type:'boolean',
  values:'true/false',
  default:'false'
},{
  key:'size',
  expr:'按钮大小',
  type:'string',
  values:'lg/sm/default',
  default:'-'
},{
  key:'icon',
  expr:'带icon按钮',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'text',
  expr:'按钮文本',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'margin',
  expr:'按钮间距',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'pullRight',
  expr:'按钮右对齐',
  type:'boolean',
  values:'true/false',
  default:'false'
},{
  key:'click',
  expr:'按钮事件',
  type:'function',
  values:'-',
  default:'-'
},{
  key:'disabled',
  expr:'禁用按钮事件',
  type:'boolean',
  values:'true/false',
  default:'false'
},{
  key:'type',
  expr:'按钮类型',
  type:'string',
  values:'button/submit',
  default:'button'
}];

let tbody1=[{
  key:'color',
  expr:'图标颜色',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'size',
  expr:'图标大小',
  type:'string',
  values:'lg/2x/3x/4x/5x',
  default:'-'
},{
  key:'fa',
  expr:'图标icon',
  type:'string',
  values:'-',
  default:'-'
},{
  key:'click',
  expr:'按钮事件',
  type:'function',
  values:'-',
  default:'-'
}];

export default class ButtonDemo extends React.Component<any,any> {
  constructor(props){
    super(props);
  };
  state={auth:'yiru'};
  static propTypes={
    name: React.PropTypes.string,
  };
  static defaultProps={
    auth:'yiru',
  };
  static contextTypes={
    router:React.PropTypes.object,
  };
  click=()=>{
    console.log('1');
  };
  render() {
  	const b1={
			color:'info',
			block:false,
      size:'sm',
			icon:'user',
			text:'test',
      margin:true,
      click:this.click,
		}
    return (
      <div className="button">
        <h2>Button</h2>
        <div>
          <Button color={'default'} margin="ms" text='default' />
          <Button color={'info'} margin="ms" text='info' />
          <Button color={'warning'} margin="ms" text='warning' />
          <Button color={'success'} margin="ms" text='success' />
          <Button color={'danger'} margin="ms" text='danger' />
        </div>
        <div>
          <Button color={'default'} margin="ms" text='default sm' size={'sm'} />
          <Button color={'info'} margin="ms" text='info lg' size={'lg'} />
          <Button color={'warning'} margin="ms" text='warning default' />
          <Button color={'success'} margin="ms" text='success sm' size={'sm'} />
          <Button color={'danger'} margin="ms" text='danger lg' size={'lg'} />
        </div>
        <div>
          <Button color={'default'} margin="ms" text='apple' icon={'apple'} />
          <Button color={'info'} margin="ms" text='html5'icon={'html5'}  />
          <Button color={'warning'} margin="ms" text='css3'icon={'css3'}  />
          <Button color={'success'} margin="ms" text='weixin'icon={'weixin'}  />
          <Button color={'danger'} margin="ms" text='qq'icon={'qq'} />
          <Button color={'danger'} margin="ms" text='disabled'icon={'qq'} disabled />
          <Button color={'info'} margin="ms" text='block'icon={'qq'} block />
        </div>
        <div className="">
          <h2>参数说明</h2>
          <Table thead={thead} tbody={tbody} noBorder={true} />
        </div>
        <h2>Icon</h2>
        <div className="icon">
          <Icon fa="user" />
          <Icon fa="user" size="lg" />
          <Icon fa="user" size="2x" />
          <Icon fa="user" size="3x" />
          <Icon fa="user" size="4x" />
          <Icon fa="user" size="5x" color="#f60" />
          <Icon fa="user" color="#f60" />
        </div>
        <div className="">
          <h2>参数说明</h2>
          <Table thead={thead} tbody={tbody1} noBorder={true} />
        </div>
      </div>
    )
  };
}
