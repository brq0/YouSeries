import React, { Component } from 'react';
import './navigation_bar.css';
import SearchBar from '../search_bar/search_bar';
import '../search_bar/search_bar.css';
const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

class NavigationBar extends Component{

  render(){
    return(
      <div>
        <ul className="header">
<<<<<<< HEAD
          <li><a className="active" id="logo">YouSeries</a></li>
          <li><a href="#">Stronga Główna</a></li>
=======
          <li><a id="logo">YouSeries</a></li>
          <li><a href="#">Strona Główna</a></li>
>>>>>>> adb27e08a9edb2c134c0ed1289c74c94311a8ca5
          <li><a href="#">Twój Profil</a></li>
          <li><a className="active" id="search"><SearchBar /></a></li>
          <li><a href="#">Wyloguj</a></li>
        </ul>
      </div>
    );
  }

}

export default NavigationBar;
