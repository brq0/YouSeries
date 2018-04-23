import React, { Component } from 'react';

const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/search/tv'

const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb(API_KEY);

let genres = [];

class GenresMenu extends Component {

  constructor(props){
    super(props);

    this.state = {
      flag: false
    }

    moviedb.genreTvList().then(res => {
      res['genres'].forEach(e=>{
        genres.push(
          {
            name: e['name'],
            id: e['id']
          }
        )
      })
      this.state.flag = true;
      console.log(genres)
    })

  }

  render() {
    // if(this.state.flag == true){
      return (
        <div>
          {genres}
          {this.sate}
        </div>
      )
    }
  // }
}
export default GenresMenu;
