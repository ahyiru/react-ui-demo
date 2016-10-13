import * as React from 'react';

export default class ErrorPage extends React.Component<any,any> {

  render() {
    return(
    	<div>
	    	<article>
		    	<h2>最新版本：0.1.6</h2>
		    	<ul>
		    		<li>新增拖拽效果</li>
		    		<li>新增日志</li>
		    	</ul>
	    	</article>
	    	<article>
		    	<h2>bugs:</h2>
		    	<ul>
		    		<li>响应式小屏幕时左侧边栏头部有border</li>
		    		<li>主题切换和sidebar切换存在问题。可能是addClass,removeClass函数的问题。</li>
		    	</ul>
	    	</article>
    	</div>
    )
  }
}