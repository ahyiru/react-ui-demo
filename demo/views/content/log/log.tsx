import * as React from 'react';

export default class ErrorPage extends React.Component<any,any> {

  render() {
    return(
    	<div>
	    	<article>
		    	<h2>最新版本：0.2.1</h2>
		    	<ul>
		    		<li>新增拖拽效果</li>
		    		<li>新增日志</li>
		    	</ul>
	    	</article>
	    	<article>
		    	<h2>bugs:</h2>
		    	<ul>
		    		<li>table待完善</li>
		    		<li>form待完善</li>
		    	</ul>
	    	</article>
    	</div>
    )
  }
}