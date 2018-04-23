import React, { Component } from 'react';
import './navigation_bar.css';
class NavigationBar extends Component{

  render(){
    return(
      <div>
        <a class="Logo">YouSeries</a>
        <ul className="header">
          <li><a href="#">Stronga Główna</a></li>
          <li><a href="#">Twój Profil</a></li>
          <li><a href="#">Wyloguj</a></li>
        </ul>
      </div>
    );
  }

}

export default NavigationBar;
