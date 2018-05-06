import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { withRouter } from 'react-router-dom';

import NavigationBar from '../navigation_bar/navigation_bar';
import SignInPage from '../logon/SignIn';

import SeriesGenerator from '../genres/SeriesGenerator';
import SeriesOfAGenre from '../genres/SeriesG';
import SeriesItemDetails from '../series/SeriesItemDetails';
import GenresMenu from '../genres_menu/genres_menu';


const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/genre/tv/list'
const QUERY = API_URL+'?api_key='+API_KEY;

const MainContent = () =>
  <div>

    <Container />



  </div>




class Container extends Component{
  constructor(props) {
    super(props);

    this.state = {
      genres: [],
      result: [],
      pickedShow: null,
      similarSeries: null
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

  // wybranie gatunku
  onClickedGenre(id){
    var query = 'https://api.themoviedb.org/3/discover/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&sort_by=popularity.desc&with_genres='
              + id;

    axios.get(query)
      .then(({ data }) => {
        this.setState({
          results: data['results'],
          pickedShow: null
        })
      })
  }

  //usuniecie serialu wybranego
  removePickedShow(){
    this.setState({
      pickedShow: null,
      similarSeries: null
    })
  }


  //uzywany do powrotu do strony glownej
  resetPage(){
    this.setState({
      results: [],
      pickedShow: null,
      similarSeries: null
    })
  }

  //lub enter na searchbarze
  searchSeries(val){
    var query = `https://api.themoviedb.org/3/search/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&query=${val}&page=1`
    console.log("CLICK")
    axios.get(query)
      .then(({ data }) => {
        this.setState({
          results: data['results'],
          pickedShow: null
        })
      })
  }

  // wybranie serialu po wygenerowaniu serialow danego gatunku
  pickShow(id){
    console.log("pick", id)
    var query = `https://api.themoviedb.org/3/tv/${id}?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US'`
    var querySimilar = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&page=1`

    axios.get(query)
      .then(({ data }) => {
        this.setState({
          pickedShow: data,
          result: []
        })
      })

    axios.get(querySimilar)
        .then(({ data }) => {
          this.setState({
            similarSeries: data
          })
    })

  }

  render(){
    const genresMenu = <GenresMenu
                          genres={this.state.genres}
                          pickGenre={this.onClickedGenre.bind(this)}
                          removeShow={this.removePickedShow.bind(this)}/>

    if(this.state.results && this.state.pickedShow == null){
      // wybrano gatunek seriali do wyswietlenia
      const opt = <SeriesGenerator results={this.state.results}
                                  pickShow={this.pickShow.bind(this)}
                                  style={{float:'left'}}/>

          return (<div>
                    <NavigationBar pickShow={this.pickShow.bind(this)}
                                  resetPage={this.resetPage.bind(this)}
                                  searchSeries={this.searchSeries.bind(this)}/>
                    <div style={{width:'100%'}}>
                      <div style={{width:'15%', float:'left', display:'inline-block'}}>{genresMenu}</div>
                      <div style={{float:'left' ,display:'inline-block', width:'85%'}}>{opt}</div>
                    </div>
                  </div>)
    }else if(this.state.pickedShow !== null){
      // wybrano serial do wyswietlenia

      const opt = <SeriesItemDetails pickedShow={this.state.pickedShow}
                                  similarSeries={this.state.similarSeries}
                                  pickShow={this.pickShow.bind(this)}
                                  style={{float:'left'}}/>

      return (<div>
                <NavigationBar pickShow={this.pickShow.bind(this)}
                      resetPage={this.resetPage.bind(this)}
                      searchSeries={this.searchSeries.bind(this)}/>
                <div style={{width:'100%'}}>
                    <div style={{width:'15%', float:'left', display:'inline-block'}}>{genresMenu}</div>
                    <div style={{float:'left' ,display:'inline-block', width:'85%'}}>{opt}</div>
                </div>
            </div>)

    }else if(this.state.results === undefined){
      // nie wybrano gatunku seriali ani serialu do wyswietlenia (poczatek strony .....)

      return  <div>
              <NavigationBar pickShow={this.pickShow.bind(this)}
                    resetPage={this.resetPage.bind(this)}
                    searchSeries={this.searchSeries.bind(this)}/>
                <div style={{width:'100%'}}>
                  <div style={{width:'15%'}}>{genresMenu}</div>
                </div>
              </div>
    }


  }

}

export default MainContent;
