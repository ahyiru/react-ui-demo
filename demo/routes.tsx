import * as React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
// const Base=require('./components/base').default;
import Frame from './components/base/';

import {
  Home,
  Demo1,
  Demo2,
  DataUI,
  DataTable,
  Demo3,
  Demo4,
  Func1,
  Func2,
  Func3,
  UI1,
  UI2,
  UI3,
  Plugin1,
  Plugin2,
  Plugin3,
  Plugin4,
  Table,
  Datatables,
  BStables,
  Highcharts,
  EchartDemo,
  Recharts,
  Easypie,
  Yform1,
  Yform,
  Treedrag,
  Card2,
  Card1,
  Card11,
  Card12,
  Log,
  Fontend,
  Info,
  MobxDemo,
  User,
  Login,
  Signup,
  About,
  API,
  ErrorPage,
  //base
  Layout,
  Color,
  ColDemo,
  ItemsDemo,
  ListDemo,
  TabsDemo,
  TableDemo,
  FormDemo,
  ButtonDemo,
  InputDemo,
  PanelDemo,
  Tools,
} from './views/content';

export default (
  <Route>
    <Route path="/" component={Frame}>

      <IndexRoute component={Home} />

      <Route path="test/test1" component={Demo1} />
      <Route path="test/test2" component={Demo2} />
      <Route path="test/dataUI" component={DataUI} />
      <Route path="test/dataUI/:tableName" component={DataTable} />
      <Route path="test/test3" component={Demo3} />
      <Route path="test/test4" component={Demo4} />

      <Route path="function/function1" component={Func1} />
      <Route path="function/function2" component={Func2} />
      <Route path="function/function3" component={Func3} />
    
      <Route path="ui/ui1" component={UI1} />
      <Route path="ui/ui2" component={UI2} />
      <Route path="ui/ui3" component={UI3} />

      <Route path="cards/card2" component={Card2} />
      <Route path="cards/card1" component={Card1} >
        <IndexRedirect to="/cards/card1/card11" />
        <Route path="card11" component={Card11} />
        <Route path="card12" component={Card12} />
      </Route>
    
      <Route path="plugins/plugin1" component={Plugin1} />
      <Route path="plugins/plugin2" component={Plugin2} />
      <Route path="plugins/plugin3" component={Plugin3} />
      <Route path="plugins/plugin4" component={Plugin4} />
    
      <Route path="tables/yTables" component={Table} />
      <Route path="tables/datatables" component={Datatables} />
      <Route path="tables/bstables" component={BStables} />
    
      <Route path="charts/highcharts" component={Highcharts} />
      <Route path="charts/echarts" component={EchartDemo} />
      <Route path="charts/recharts" component={Recharts} />
      <Route path="charts/easypie" component={Easypie} />

      <Route path="form/yform1" component={Yform1} />
      <Route path="form/yform" component={Yform} />
      <Route path="form/treedrag" component={Treedrag} />

      <Route path="/info" component={Info} />

      <Route path="/mobx-demo" component={MobxDemo} />

      <Route path="/log" component={Log} />

      <Route path="/fontend" component={Fontend} />

      <Route path="base/layout" component={Layout} />
      <Route path="base/color" component={Color} />
      <Route path="base/col" component={ColDemo} />
      <Route path="base/items" component={ItemsDemo} />
      <Route path="base/list" component={ListDemo} />
      <Route path="base/tabs" component={TabsDemo} />
      <Route path="base/button" component={ButtonDemo} />
      <Route path="base/input" component={InputDemo} />
      <Route path="base/table" component={TableDemo} />
      <Route path="base/form" component={FormDemo} />
      <Route path="base/panel" component={PanelDemo} />
      <Route path="base/echarts" component={EchartDemo} />
      <Route path="base/tools" component={Tools} />

    </Route>

    <Route path="/user" component={User}>
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
    </Route>

    <Route path="/api" component={API} />

    <Route path="/404" component={ErrorPage} />

    <Route path="*" onEnter={(params,replace:Function)=>replace('/404')} />

  </Route>
);
