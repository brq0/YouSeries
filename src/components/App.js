import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';

import MainContent from './content/container';

import SignUpPage from './logon/SignUp';
import SignInPage from './logon/SignIn';
import AccountPage from './profile/Account'

import * as routes from '../constants/routes';
import { firebase } from './firebase';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      authUser: null,
    };
  }

  componentDidMount() {
    firebase.auth.onAuthStateChanged(authUser => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });


}

  render() {

    return (
      <Router>

        <div>

          <Route exact path={routes.LANDING} component={() => this.state.authUser ? <MainContent authUser={this.state.authUser} /> : <SignInPage />} />

          <Route exact path={routes.SIGN_UP} component={() => <SignUpPage />} />

          <Route exact path={routes.ACCOUNT} component={() => <AccountPage authUser={this.state.authUser}/>} />

        </div>

      </Router>



    );
  }
}

export default App;
