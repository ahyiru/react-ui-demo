import React from 'react';
import { Router, hashHistory, browserHistory } from 'react-router';

import routes from './routes';

import 'font-awesome/css/font-awesome.css';
// import 'antd/dist/antd.min.css';

import 'styles/mystyle.css';
import 'styles/y-style.css';

module.exports = (
  <Router history={hashHistory} routes={routes}/>
);