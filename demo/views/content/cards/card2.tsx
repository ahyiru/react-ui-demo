import * as React from 'react';

import Circle from './circle';
import './card1.less';

export default class Card2 extends React.Component<any,any> {

  render() {
    return (
      <div className="card1">
        <div className="show-list">
					<div className="ls-left">
						<Circle data={{type:1,per:2.4}} />
      		</div>
      		<div className="ls-right">
      			<p>test</p>
      			<p><b>22</b> 次</p>
      		</div>
      	</div>
        <a href="#/cards/card1/card11">Card11</a>
        <a href="#/cards/card1/card12">Card12</a>
        {this.props.children}
      </div>
    )
  };
}
