import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import Login from '../views/user/login';
import Index from '../views/index';

const mainRouter = [
  {
    name: '工作区',
    icon: 'workspace',
    key: 'index',
    route: {
      path: '/index',
      component: Index
    }
  },
  {
    name: '登录',
    icon: 'login',
    key: 'login',
    route: {
      path: '/login',
      component: Login
    }
  }
];

const routes = (
  <Switch>
    {mainRouter.map((route, i) => <Route key={i} {...route.route} />)}
    <Redirect to='/login' />
  </Switch>
);

export default routes;
