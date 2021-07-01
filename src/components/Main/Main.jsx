import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import SignUp from './SignUp';
import SignIn from './SignIn';
import Dashboard from './Dashboard';

function Main() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/signin">
            <SignIn />
          </Route>
          <Route exact path="/signup">
            <SignUp />
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default Main;
