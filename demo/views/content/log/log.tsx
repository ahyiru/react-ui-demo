import * as React from 'react';

import './log.less';

export default class Log extends React.Component<any,any> {

  render() {
    return(
    	<div className="ylog">
	    	<article>
		    	<h2>最新版本：0.2.3</h2>
		    	<ul>
		    		<li>新增拖拽效果</li>
		    		<li>新增日志</li>
		    		<li>新增canvas画板demo</li>
		    		<li>新增autocomplete</li>
		    	</ul>
	    	</article>
	    	<article>
		    	<h2>bugs:</h2>
		    	<ul>
		    		<li>table待完善</li>
		    		<li>form待完善</li>
		    		<li>canvas画板待完善</li>
		    	</ul>
	    	</article>
	    	<article>
		    	<h2>计划:</h2>
		    	<ul>
		    		{/*<li>根据layui完善yrui</li>*/}
		    		<li>组件的完善和规范化</li>
		    		<li>使用nodejs和mongodb部署服务，使用户自定义配置页面。</li>
		    		<li>react-native的学习和开发</li>
		    	</ul>
	    	</article>
    	</div>
    )
  }
}