import * as React from 'react';
import PageHeader from './pageheader';
import BackTop from './backtop';

export default class Main extends React.Component<any,any> {

  render() {
    return (
      <main>
        <section className="y-main">
          <div className="y-container">
            <PageHeader breadcrumb={this.props.breadcrumb} hidePagetitle={this.props.hidePagetitle} />
            <div className="y-pagecontent">
              {this.props.children}
            </div>
          </div>
          <BackTop />
        </section>
      </main>
    );
  }
}
