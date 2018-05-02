import React, { Component } from 'react';

import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';
import './Logon.css';

class Logon extends Component{


  render(){
    return(
      <div>
        <a id="logo"></a>
        <div className="center text-center">
          <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
            <label for="inputEmail" className="sr-only">Email address</label>
            <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required autofocus />
            <label for="inputPassword" className="sr-only">Password</label>
            <input type="password" id="inputPassword" className="form-control" placeholder="Password" required />
            <div className="checkbox mb-3" >
              <label>
                <input type="checkbox" value="remember-me" /> Remember me
              </label>
            </div>
            <div class="buttons">
              <button className="btn btn-lg btn-danger btn-block" type="submit"><Link to={routes.SIGN_IN}>Sign in</Link></button>
              <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in by FB</button>
            </div>

            <p class="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
          </form>
        </div>
      </div>
        );
  }
}

export default Logon;
