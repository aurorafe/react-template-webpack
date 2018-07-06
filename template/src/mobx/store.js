import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';

import map from './map';

const browserHistory = createBrowserHistory();
const routingStore = new RouterStore();

export let history = syncHistoryWithStore(browserHistory, routingStore);

export let stores = {
  map,
  routing: routingStore,
};
