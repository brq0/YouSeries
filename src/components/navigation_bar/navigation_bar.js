import React, { Component } from 'react';

import './navigation_bar.css';
import '../search_bar/search_bar.css';

import * as routes from '../../constants/routes';
import { Link } from 'react-router-dom';

import SearchBar from '../search_bar/search_bar';
import SignOut from '../logon/SignOut'

const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

class NavigationBar extends Component{

  render(){
    return(
          <div style={{borderBottom: "2px solid #cc0411"}}>


            <ul className="header">
              <li><a className="active" id="logo"></a></li>
              <li><a href="#">Strona Główna</a></li>
              <li><a href="#">Twój Profil</a></li>
              <li><a href="#" id="search"><SearchBar /></a></li>
              <li className="logoutBtn"><SignOut /></li>
            </ul>
          </div>

    );
  }

}

export default NavigationBar;
