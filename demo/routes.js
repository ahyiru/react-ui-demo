import React from 'react';
import { Route, IndexRoute, Redirect, IndexRedirect } from 'react-router';
import Base from './components/base/Base';

import {
  Home,
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
  yTables,
  Datatables,
  BStables,
  Highcharts,
  Echarts,
  Recharts,
  Easypie,
  User,
  About,
  ErrorPage
} from './views/content';


export default (
  <Route path="/" component={Base}>

    <IndexRoute component={Home} />

    <Route path="function/function1" component={Func1} />
    <Route path="function/function2" component={Func2} />
    <Route path="function/function3" component={Func3} />
  
    <Route path="ui/ui1" component={UI1} />
    <Route path="ui/ui2" component={UI2} />
    <Route path="ui/ui3" component={UI3} />
  
    <Route path="plugins/plugin1" component={Plugin1} />
    <Route path="plugins/plugin2" component={Plugin2} />
    <Route path="plugins/plugin3" component={Plugin3} />
    <Route path="plugins/plugin4" component={Plugin4} />
  
    <Route path="tables/yTables" component={yTables} />
    <Route path="tables/datatables" component={Datatables} />
    <Route path="tables/bstables" component={BStables} />
  
    <Route path="charts/highcharts" component={Highcharts} />
    <Route path="charts/echarts" component={Echarts} />
    <Route path="charts/recharts" component={Recharts} />
    <Route path="charts/easypie" component={Easypie} />
    
    <Route path="/user" component={User} />

    <Route path="/404" component={ErrorPage} />

    

    <Route path="*" onEnter={(params,replace)=>replace('/404')} />

  </Route>
);
