import * as React from 'react';

import Row from '../base/row';
import Col from '../base/col';
import Form,{FormItem} from '../base/form';

import Textarea from './textarea';
import Radio from './radio';
import Checkbox from './checkbox';
import Select from './select';

export default class SelectDemo extends React.Component<any,any> {

  state={
    radioChecked:'0',
    checkboxChecked:null,
    selVal:'',
  };

  radioChange=(e)=>{
    console.log('radio checked',e.target.value);
    this.setState({
      radioChecked:e.target.value,
    });
  };
  checkboxChange=(list)=>{
    console.log(list);
    this.setState({
      checkboxChecked:list,
    });
  };
  getSelectVal=(val)=>{
    console.log(val);
    this.setState({
      selVal:val,
    });
  };

  render() {
    return (
      <div className="">
        <Form horizontal >
          <Row gutter={12}>
            <Col span={4}>
              <Select value={this.state.selVal} data={[1,2,3]} style={{width:'100px'}} getSelectVal={this.getSelectVal} />
            </Col>
            <Col span={4}>
              <Select value={this.state.selVal} data={[1,2,3]} getSelectVal={this.getSelectVal} />
            </Col>
            <Col span={4}>
              <Textarea placeholder="test" />
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={4}>
              <Radio name="a" opt={[{label:'t1'},{label:'t2'},{label:'t3'}]} checked={this.state.radioChecked} change={this.radioChange} />
            </Col>
            <Col span={4}>
              <Radio name="b" inline opt={[{label:'t11'},{label:'t12'},{label:'t13'}]} checked={this.state.radioChecked} change={this.radioChange} />
            </Col>
            <Col span={4}>
              
            </Col>
          </Row>
          <Row gutter={12}>
            <Col span={4}>
              <Checkbox opt={[{label:'t1'},{label:'t2'},{label:'t3'}]} checked={this.state.checkboxChecked} change={this.checkboxChange} />
            </Col>
            <Col span={4}>
              <Checkbox inline opt={[{label:'t11'},{label:'t12'},{label:'t13'}]} checked={this.state.checkboxChecked} change={this.checkboxChange} />
            </Col>
          </Row>
        </Form>
      </div>
    )
  };
}
