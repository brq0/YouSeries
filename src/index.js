import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
 } from 'react-router-dom';

import GenresMenu from './components/genres_menu/genres_menu';
import Container from './components/content/container';
import NavigationBar from './components/navigation_bar/navigation_bar';
import Logon from './components/logon/Logon';

import * as routes from './constants/routes';

import './clear.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.css';


const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

const App = () => {
  return (

  );
}

ReactDOM.render(<App />, document.getElementById('root'));