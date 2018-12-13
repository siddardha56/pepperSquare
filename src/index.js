import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import { store, history } from './store';
import Routes from './routes';
import './assets/css/global.scss';

const App = () => (
  <Provider store={store}>
    <Routes history={history} />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('app'));
