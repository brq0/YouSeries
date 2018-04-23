import React, { Component } from 'react';
import axios from 'axios';
import './genres_menu.css';

const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/genre/tv/list'
const QUERY = API_URL+'?api_key='+API_KEY;

// const MovieDb = require('moviedb-promise')
// const moviedb = new MovieDb(API_KEY);

let genres = [];

window.onload = function() {
      console.log('load')
}

function onGenreClick(id){
  alert(id);
}

class GenresMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    };
  }

  componentDidMount() {
    axios.get(`${QUERY}`)
      .then(({ data }) => {
		  console.log(data['genres']);
        this.setState({
          genres: data['genres']
        })
      })
  }

  render() {
    const { genres } = this.state;
    return (
      <div className="genresContainer">
        {genres.map(genre =>
          <div key={genre.id} className="genre">
            <p onClick={()=>onGenreClick(genre.id)}>{genre.name}</p>
          </div>
        )}
      </div>
    );
  }

}
export default GenresMenu;
