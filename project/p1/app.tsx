import * as React from 'react';
import { Router, hashHistory, browserHistory } from 'react-router';

import routes from './routes';

import 'font-awesome/css/font-awesome.css';
// import 'antd/dist/antd.min.css';
require('./servers/localStorage.js');

import './styles/y-style.less';
import './styles/theme.less';

export default (
  <Router history={hashHistory} routes={routes}/>
);
