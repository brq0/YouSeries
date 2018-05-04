import React, { Component } from 'react';
import {
  Link,
  withRouter,
 } from 'react-router-dom';

import { auth } from '../firebase/';
import * as routes from '../../constants/routes';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Logon.css';

const SignUpPage = ({ history }) =>
  <div>
    <a id="logo"></a>
    <SignUpForm history={history} />
  </div>


  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };

  const byPropKey = (propertyName, value) => () => ({
    [propertyName]: value,
  });

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {

      const {
         username,
         email,
         passwordOne,
       } = this.state;

       const {
         history,
       } = this.props;

       auth.doCreateUserWithEmailAndPassword(email, passwordOne)
         .then(authUser => {
           this.setState(() => ({ ...INITIAL_STATE }));
           history.push(routes.HOME);
         })
         .catch(error => {
           this.setState(byPropKey('error', error));
         });

       event.preventDefault();
  }

  render() {
      const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;

      const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';

      return (
        <div>
          <div className="text-center form-signin">

            <form onSubmit={this.onSubmit}>
              <h1 className="h3 mb-3 font-weight-normal">Please fill in the sign up form</h1>
              <label htmlFor="inputName" className="sr-only">Full Name</label>
              <input
                value={username}
                id="inputName"
                className="form-control"
                onChange={event => this.setState(byPropKey('username', event.target.value))}
                type="text"
                placeholder="Full Name"
                required autoFocus
              />
              <label htmlFor="inputEmail" className="sr-only">Email address</label>
              <input
                value={email}
                id="inputEmail"
                className="form-control"
                onChange={event => this.setState(byPropKey('email', event.target.value))}
                type="email"
                placeholder="Email Address"
                required
              />
              <label htmlFor="inputPassword" className="sr-only">Password</label>
              <input
                value={passwordOne}
                id="inputPassword"
                className="form-control"
                onChange={event => this.setState(byPropKey('passwordOne', event.target.value))}
                type="password"
                placeholder="Password"
                required
              />
              <label htmlFor="lastElement" className="sr-only">Password</label>
              <input
                value={passwordTwo}
                id="lastElement"
                className="form-control"
                onChange={event => this.setState(byPropKey('passwordTwo', event.target.value))}
                type="password"
                placeholder="Confirm Password"
              />
              <button className="btn btn-lg btn-danger btn-block" disabled={isInvalid} type="submit">
                Sign Up
              </button>

              { error && <p>{error.message}</p> }
            </form>
          </div>

        </div>
      );
    }
}

const SignUpLink = () =>
  <p>
    Don't have an account?
    {' '}
    SignIn
  </p>


export default SignUpPage;

export {
  SignUpForm,
  SignUpLink,
};
