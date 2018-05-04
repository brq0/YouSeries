import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import NavigationBar from '../navigation_bar/navigation_bar';
import SignInPage from '../logon/SignIn';

import SeriesGenerator from '../genres/SeriesGenerator';
import SeriesOfAGenre from '../genres/SeriesG';
import GenresMenu from '../genres_menu/genres_menu';


const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/genre/tv/list'
const QUERY = API_URL+'?api_key='+API_KEY;

const MainContent = () =>
  <div>

    <NavigationBar />
    <Container />



  </div>




class Container extends Component{
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      result: [],
      // previousGenre: 0,
      pickedGenre: 0
    };
  }

  componentDidMount() {
    axios.get(`${QUERY}`)
      .then(({ data }) => {
        this.setState({
          genres: data['genres']
        })
      })
  }

  onClickedGenre(id){
    // this.setState({
    //   previousGenre: this.state.pickedGenre,
    //   pickedGenre: id
    // })
    var query = 'https://api.themoviedb.org/3/discover/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&sort_by=popularity.desc&with_genres='
              + id;

    axios.get(query)
      .then(({ data }) => {
        this.setState({
          results: data['results']
        })
      })
  }

  render(){
    const genresMenu = <GenresMenu
                          genres={this.state.genres}
                          pickedGenre={this.state.pickedGenre}
                          pickGenre={this.onClickedGenre.bind(this)}/>
    // if(this.state.pickedGenre != this.state.previousGenre){

    if(this.state.results){
      const opt = <SeriesGenerator results={this.state.results}  style={{float:'left'}}/>
      return (<div style={{width:'100%'}}>
              <div style={{width:'15%', float:'left', display:'inline-block'}}>{genresMenu}</div>
              <div style={{float:'left' ,display:'inline-block', width:'85%'}}>{opt}</div>
            </div>)
    }

    return <div style={{width:'15%'}}>{genresMenu}</div>
  }

}

export default MainContent;
