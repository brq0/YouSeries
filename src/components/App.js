import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';

import GenresMenu from './genres_menu/genres_menu';
import MainContent from './content/container';
import NavigationBar from './navigation_bar/navigation_bar';

import LandingPage from './content/Landing';
import SignUpPage from './logon/SignUp';
import SignInPage from './logon/SignIn';
import SignOut from './logon/SignOut';

import * as routes from '../constants/routes';
import { firebase } from './firebase';


const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

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
      <div>
        {this.state.authUser ? <MainContent /> : <SignInPage />}
      </div>



    );
  }
}

export default App;