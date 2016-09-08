import * as React from 'react';

export default class Func1 extends React.Component<any,any> {

  render() {
    return (
      <div>
        <span>func1</span>
        <img src={require('../../../styles/images/usr.jpg')} />
      </div>
    )
  };
}
