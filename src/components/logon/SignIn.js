import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import * as routes from '../../constants/routes';
import { auth } from '../firebase/';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Logon.css';

const SignInPage = ({ history }) =>
  <div>
    <a id="logo"></a>
    <div className="text-center form-signin">
      <SignInForm history={history} />
      <SignUpLink />
    </div>
  </div>

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};


class SignInForm extends Component{

  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const {
      email,
      password,
    } = this.state;

    const {
      history,
    } = this.props;

    auth.doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render(){

    const {
      email,
      password,
      error,
    } = this.state;

    return(
      <div>
        <form onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail" className="sr-only">Email address</label>
          <input
            value={email}
            onChange={event => this.setState(byPropKey('email', event.target.value))}
            type="email"
            id="inputEmail"
            className="form-control"
            placeholder="Email address"
            required autoFocus
          />
          <label htmlFor="lastElement" className="sr-only">Password</label>
          <input
            value={password}
            onChange={event => this.setState(byPropKey('password', event.target.value))}
            type="password"
            id="lastElement"
            className="form-control"
            placeholder="Password"
            required
          />
          <button className="btn btn-lg btn-danger btn-block" type="submit">Sign in</button>
        </form>
        <button id="lastElement" className="btn btn-lg btn-primary btn-block">Sign in by FB</button>
      </div>
        );
  }
}

export default withRouter(SignInPage);

export {
  SignInForm,
};
