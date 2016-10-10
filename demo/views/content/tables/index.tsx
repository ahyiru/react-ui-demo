import * as React from 'react';

import Ytables from './yTables';

import {tableData} from '../../../models/models';

export default class Table extends React.Component<any,any> {

  constructor(props){
    super(props);
  };

  render() {

    return (
      <Ytables yth={tableData.thead} ytb={tableData.tbody} editable={true} />
    );
  }
}
