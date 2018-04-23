import React, { Component } from 'react';
import './navigation_bar.css';
import SearchBar from '../search_bar/search_bar';

const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

class NavigationBar extends Component{

  render(){
    return(
      <div>
        <a class="Logo">YouSeries</a>
        <ul className="header">
          <li><a href="#">Stronga Główna</a></li>
          <li><a href="#">Twój Profil</a></li>
          <li><a><SearchBar /></a></li>
          <li><a href="#">Wyloguj</a></li>

        </ul>
      </div>
    );
  }

}

export default NavigationBar;
