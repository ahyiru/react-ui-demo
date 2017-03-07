import React, { Component } from 'react';

export default class RightBar extends Component<any,any> {
  
  render() {
    return (
      <section className="right-bar">
        {this.props.children}
      </section>
    );
  }
}
