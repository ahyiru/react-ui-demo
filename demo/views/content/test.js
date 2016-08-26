import React, { Component } from 'react';

import { Button, Icon, Row, Col, Checkbox, DatePicker } from 'antd';

import './test.css';

const ButtonGroup = Button.Group;
const CheckboxGroup = Checkbox.Group;
const options = [
  { label: '苹果', value: 'Apple' },
  { label: '梨', value: 'Pear' },
  { label: '橘', value: 'Orange' },
];
function checkBox(checkedValues) {
  console.log('checked = ', checkedValues);
}
function datePick(value, dateString) {
  console.log(value, dateString);
}

export default class test extends Component {

  render() {
    return (
      <div>
        <span>这是一个测试页面，欢迎光临！</span>
        <div className="m-l-3">
	        <Button type="primary">Primary</Button>
			    <Button>Default</Button>
			    <Button type="ghost">Ghost</Button>
			    <Button type="dashed">Dashed</Button>
			    <Button type="primary" shape="circle" icon="search" />
	    		<Button type="primary" icon="search">搜索</Button>
    		</div>

    		<div>
	    		<ButtonGroup>
			      <Button type="primary">L</Button>
			      <Button>M</Button>
			      <Button type="ghost">M</Button>
			      <Button type="dashed">R</Button>
			    </ButtonGroup>
		    </div>

		    <div>
		    	<Icon type="apple" />
		    	<Icon type="github" />
		    	<Icon type="user" />
		    </div>

		    <div className="bg-c">
			    <Row>
			      <Col span={12}>.ant-col-12</Col>
			      <Col span={12}>.ant-col-12</Col>
			    </Row>
			    <Row>
			      <Col span={8}>.ant-col-8</Col>
			      <Col span={8}>.ant-col-8</Col>
			      <Col span={8}>.ant-col-8</Col>
			    </Row>
			    <Row>
			      <Col span={6}>.ant-col-6</Col>
			      <Col span={6}>.ant-col-6</Col>
			      <Col span={6}>.ant-col-6</Col>
			      <Col span={6}>.ant-col-6</Col>
			    </Row>
			  </div>

			  <div>
			  	<CheckboxGroup options={options} defaultValue={['Pear']} onChange={checkBox} />
			  </div>

			  <div>
			  	<DatePicker onChange={datePick} />
			  </div>

      </div>
    )
  }
}
