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

import InfiniteScroll from 'react-infinite-scroll-component';

import './container_style.css'


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
      genreName: "",
      genreId: 0,
      results: null,
      page: 1,
      result: [],
      pickedShow: null,
      similarSeries: null,
      items: []
    };

     this.loadMoreSeries = this.loadMoreSeries.bind(this);
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
  onClickedGenre(id, name){
    var query = `https://api.themoviedb.org/3/discover/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US
          &sort_by=popularity.desc&page=1&with_genres=
              ${id}`;

    axios.get(query)
      .then(({ data }) => {
          this.setState({
            results: data['results'],
            pickedShow: null,
            genreName: name,
            genreId: id,
            items: []
          })
      })
  }

  loadMoreSeries(){
    let page = this.state.page + 1;
    var query = `https://api.themoviedb.org/3/discover/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US
          &sort_by=popularity.desc&page=${page}&with_genres=
              ${this.state.genreId}`;


    axios.get(query)
      .then(({ data }) => {
          this.setState({
            results: data['results'],
            page: data.page
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
      results: null,
      pickedShow: null,
      similarSeries: null,
      page: 1,
      genreName: "",
      genreId: 0,
      items: []
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
    document.body.scrollTop = document.documentElement.scrollTop = 0; //scrolluje do poczatku strony

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

    if(this.state.genreId != 0 && this.state.pickedShow == null){
      // wybrano gatunek seriali do wyswietlenia

      console.log("gat")
      const loader = <div className="loader">Loading ...</div>;


        if(this.state.results != null){
        this.state.results.map((r, i) => {
            this.state.items.push(
              <div className="col-md-3 my-3" key={r.id} style={{display:'inline-block'}}>
            	  <img className='media-object' id="seriesItem"
            	   src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`}
            		alt="" style={{width:'75%'}} onClick={()=>this.pickShow(r.id)}/>
              </div>
            );
        });
      }


        // <SeriesGenerator results={this.state.results}
        //               pickShow={this.pickShow.bind(this)}
        //              />

      const opt = <div key={this.state.page}>
                    <p id="genreLabel">{this.state.genreName}</p>

                    <InfiniteScroll
                       pageStart={0}
                       next={this.loadMoreSeries}
                       hasMore={true}
                       loader={loader}>
                          {this.state.items}
                    </InfiniteScroll>
                  </div>

          return (<div>
                    <NavigationBar pickShow={this.pickShow.bind(this)}
                                  resetPage={this.resetPage.bind(this)}
                                  searchSeries={this.searchSeries.bind(this)}/>
                    <div className="container">
						<div className="row">
							<div className="col-md-2">{genresMenu}</div>
							<div className="col-md-10">{opt}</div>
						</div>
					</div>
                  </div>)
    }else if(this.state.pickedShow !== null){
      // wybrano serial do wyswietlenia

      const opt = <SeriesItemDetails pickedShow={this.state.pickedShow}
                                  similarSeries={this.state.similarSeries}
                                  pickShow={this.pickShow.bind(this)}
                                  />

      return (<div>
                <NavigationBar pickShow={this.pickShow.bind(this)}
                      resetPage={this.resetPage.bind(this)}
                      searchSeries={this.searchSeries.bind(this)}/>
				<div className="container">
					<div className="row">
						<div className="col-md-2">{genresMenu}</div>
						<div className="col-md-10">{opt}</div>
					</div>
				</div>
            </div> )

    }else if(this.state.results === null){
      // nie wybrano gatunku seriali ani serialu do wyswietlenia (poczatek strony .....)

      return  <div>
              <NavigationBar pickShow={this.pickShow.bind(this)}
                    resetPage={this.resetPage.bind(this)}
                    searchSeries={this.searchSeries.bind(this)}/>
				<div className="container">
					<div className="row">
						<div className="col-md-2">{genresMenu}</div>
						<div className="col-md-10"></div>
					</div>
				</div>
              </div>
    }


  }

}

export default MainContent;
