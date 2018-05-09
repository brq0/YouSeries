import React, { Component } from 'react';

import { auth } from '../firebase/';

const byPropKey = (propertyName, value) => () => ({
  [propertyName]: value,
});

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { passwordOne } = this.state;

    auth.doPasswordUpdate(passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });

    event.preventDefault();
  }

  render() {
    const {
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '';

    return (

      <div className="text-center form-signin">

        <form onSubmit={this.onSubmit}>
          <h1 className="h3 mb-3 font-weight-normal">Change your password</h1>
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
            Change password
          </button>

          { error && <p>{error.message}</p> }
        </form>
      </div>

    );
  }
}

export default PasswordChangeForm;
