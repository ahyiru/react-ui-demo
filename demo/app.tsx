import * as React from 'react';
import { Router, hashHistory, browserHistory } from 'react-router';

import routes from './routes';

import 'font-awesome/css/font-awesome.css';

import './styles/y-style.less';
import './styles/stheme.less';

import {getDefault} from './servers/storage';

getDefault();

export default (
  <Router history={hashHistory} routes={routes}/>
);
