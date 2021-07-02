import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// components
import SignUp from './SignUp';
import SignIn from './SignIn';
import ConfirmEmail from './ConfirmEmail';
import Dashboard from './Dashboard';
import ForgotPassword from './ForgotPassword';

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
          <Route exact path="/confirmemail/:email">
            <ConfirmEmail />
          </Route>
          <Route exact path="/forgotpassword">
            <ForgotPassword />
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
