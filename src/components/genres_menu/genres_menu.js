import React, { Component } from 'react';
import axios from 'axios';
import './genres_menu.css';

import SeriesOfAGenre from '../genres/SeriesG'
import SeriesGenerator from '../genres/SeriesGenerator'
import ReactDOM from 'react-dom';

const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/genre/tv/list'
const QUERY = API_URL+'?api_key='+API_KEY;

// const MovieDb = require('moviedb-promise')
// const moviedb = new MovieDb(API_KEY);

let genres = [];

window.onload = function() {
      console.log('load')
}

// function onGenreClick(id){
//   alert(id);
//
//   ReactDOM.render(<SeriesOfAGenre genreId={id} />, document.getElementById('container'));
// }

class GenresMenu extends Component {

  constructor(props) {
    super(props);

    this.state = {
      genres: [],
    };
  }

  onGenreClick(id){
    // alert(id);
    var query = 'https://api.themoviedb.org/3/discover/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&sort_by=popularity.desc&with_genres='
              + id;

    axios.get(query)
      .then(({ data }) => {
        this.setState({
          results: data['results']
        })
      })

  }
  componentDidMount() {
    axios.get(`${QUERY}`)
      .then(({ data }) => {
        this.setState({
          genres: data['genres']
        })
      })
  }

  render() {
    const genres = this.state.genres;
    const genresMenu = (<div className="genresContainer">
      {genres.map(genre =>
        <div key={genre.id} className="genre">
          <p onClick={()=>this.onGenreClick(genre.id)}>{genre.name}</p>
        </div>
      )}
    </div>)

    if(this.state.results){
      const opt = <SeriesGenerator results={this.state.results}  style={{float:'left'}}/>
      return (<div>
              <div style={{width:'150px', float:'left',display:'inline-block'}}>{genresMenu}</div>
              <div style={{float:'left' ,display:'inline-block'}}>{opt}</div>
            </div>)
    }


    return (
      <div style={{width:'150px'}}>{genresMenu}</div>
    );
  }

}
export default GenresMenu;
