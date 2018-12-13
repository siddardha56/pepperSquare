import React from 'react';
import PropTypes from 'prop-types';
import { Router, Route, Switch } from 'react-router-dom';

import Dashboard from '../containers/Dashboard/Dashboard';

const Routes = ({ history }) => (
  <Router history={history} >
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route render={() => <h1>Page not found</h1>} />
    </Switch>
  </Router>
);

Routes.propTypes = {
  history: PropTypes.object.isRequired,
};

export default Routes;
