import React from 'react';
import { Switch, Route } from 'react-router-dom'
import Dashboard from '../views/dashboard';

const appRouter = [
  {
    name: '监控首页',
    icon: 'dashboard',
    class: 'dashboard-content',
    key: 'dashboard',
    route: {
      path: '/index/Dashboard',
      component: Dashboard
    }
  }
];

const routes = (
  <Switch>
    {appRouter.map((route, i) => <Route className={route.class} key={i} {...route.route} />)}
  </Switch>
);

export default routes;
