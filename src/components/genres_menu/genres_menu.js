import React, { Component } from 'react';
import axios from 'axios';
import './genres_menu.css';

import SeriesOfAGenre from '../genres/SeriesG'
import SeriesGenerator from '../genres/SeriesGenerator'
import ReactDOM from 'react-dom';

const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/genre/tv/list'
const QUERY = API_URL+'?api_key='+API_KEY;


function onGenreClick(id, name, props){
  props.pickGenre(id, name)

  props.removeShow()
}

const GenresMenu = (props) => {
  if(props.genres.length > 1){
    const genres = props.genres;
    const genresMenu = (<div className="genresContainer">
          {genres.map(genre =>
            <div key={genre.id} className="genre">
              <p onClick={()=>onGenreClick(genre.id, genre.name, props)}>{genre.name}</p>
            </div>
          )}
        </div>)
    return genresMenu;
  }

  return <div></div>
}


export default GenresMenu;
