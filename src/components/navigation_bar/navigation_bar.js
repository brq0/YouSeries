import React, { Component } from 'react';

import './navigation_bar.css';
import '../search_bar/search_bar.css';

import SearchBar from '../search_bar/search_bar';
import MainContent from '../content/main_content';
import ProfileContent from '../content/profile_content';

import {
  Route,
  NavLink,
  HashRouter
} from "react-router-dom";

const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

class NavigationBar extends Component{

  render(){
    return(
      <HashRouter>
        <div>
          <div style={{borderBottom: "2px solid #cc0411"}}>
            <ul className="header">
              <li><a className="active" id="logo">YouSeries</a></li>
              <li><NavLink to="/">Strona Główna</NavLink></li>
              <li><NavLink to="/profile">Twój Profil</NavLink></li>
              <li><a className="active" id="search"><SearchBar /></a></li>
              <li className="logoutBtn"><a href="#">Wyloguj</a></li>
            </ul>
          </div>
          <div className="content">
            <Route exact path="/" component={MainContent}/>
            <Route path="/profile" component={ProfileContent}/>
          </div>
        </div>
      </HashRouter>

    );
  }

}

export default NavigationBar;
