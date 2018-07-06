import './assets/style/view/index.scss';
import './assets/style/common/normalize.css';
import 'antd/dist/antd.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router} from 'react-router-dom';
import {AppContainer} from 'react-hot-loader';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import { LocaleProvider  } from 'antd';
import routes from './routes/index';
import registerServiceWorker from './utils/registerServiceWorker';

{{#if_eq state 'redux'}}
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import {store} from './redux/index';
{{/if_eq}}

{{#if_eq state 'mobx'}}
import { Provider } from 'mobx-react';
import { configure } from 'mobx';
import { stores, history } from './mobx/stores';

configure({
  enforceActions: true
});
{{/if_eq}}

const env = process.env.NODE_ENV || 'development';
const RootApp = () => {
  {{#if_eq state 'redux'}}
  return (
    <LocaleProvider locale={zhCN}>
      <Provider store={store}>
        <Router>
          {routes}
        </Router>
      </Provider>
    </LocaleProvider>
  )
  {{/if_eq}}
    {{#if_eq state 'mobx'}}
    return (
      <Provider {...stores}>
        <Router history={history}>
          {routes}
        </Router>
      </Provider>
      )
  {{/if_eq}}
};

// Render the main component into the dom
if (env === 'development') {
  window.onload = function () {
    const render = Component => {
      ReactDOM.render(
        <AppContainer>
          <Component />
        </AppContainer>,
        document.getElementById('app')
      );
    };
    render(RootApp);

    // HMR
    if (module.hot) {
      module.hot.accept('./routes', () => { render(RootApp); });
    }
  };
} else {
  window.onload = function () {
    ReactDOM.render(
      <RootApp/>,
      document.getElementById('app')
    );
  };
}

registerServiceWorker();
