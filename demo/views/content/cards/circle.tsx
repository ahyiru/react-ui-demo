import * as React from 'react';

import './circle.less';

export default class Circle extends React.Component<any,any> {

    render() {
    	const {data}=this.props;
        return (
        	<div className="">
        		{
        			!!data.type?<div className="ycircle1">
							    <span className="txt"><b>{data.per}</b>%</span>
							    <span className="icot"><i className="fa fa-arrow-up"></i></span>
							    <span className="icob"></span>
							</div>:
							<div className="ycircle2">
							    <span className="txt"><b>{data.per}</b>%</span>
							    <span className="icot"></span>
							    <span className="icob"><i className="fa fa-arrow-down"></i></span>
							</div>
						}
		      </div>
        )
    };
}
