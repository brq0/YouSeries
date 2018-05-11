import React, { Component } from 'react';
import axios from 'axios';
import NavigationBar from '../navigation_bar/navigation_bar';

import SeriesItemDetails from '../series/SeriesItemDetails';
import UserSeriesList from '../series/UserSeriesList';
import PopularSeriesList from '../series/PopularSeriesList';
import GenresMenu from '../genres_menu/genres_menu';

import InfiniteScroll from 'react-infinite-scroll-component';

import { firebase } from '../firebase';

import './container_style.css'


const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/genre/tv/list'
const QUERY = API_URL+'?api_key='+API_KEY;

const MainContent = (props) =>
  <div>

    <Container authUser={props.authUser}/>

  </div>

window.onload = (e) => {

}

class Container extends Component{
  constructor(props) {
    super(props);

    this.state = {
      authUser: props.authUser,
      userSeries: 0,
      genres: [],
      genreOrSearchLabel: "",
      genreId: 0,
      hasMoreItems: true,
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

      firebase.app.database().ref(`items/${this.state.authUser.uid}/`).on('value', snapshot => {
        this.setState({
          userSeries: snapshot.val()
        })
      });
}

  // wybranie gatunku
  onClickedGenre(id, name){
    var query = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US
          &sort_by=popularity.desc&page=1&with_genres=
              ${id}`;

    axios.get(query)
      .then(({ data }) => {
          this.setState({
            results: data['results'],
            pickedShow: null,
            genreOrSearchLabel: name,
            hasMoreItems: true,
            genreId: id,
            page: 1,
            items: []
          })
      })
  }

  loadMoreSeries(){
    let page = this.state.page + 1;
    var query = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US
          &sort_by=popularity.desc&page=${page}&with_genres=
              ${this.state.genreId}`;


    axios.get(query)
      .then(({ data }) => {
          this.setState({
            results: data['results'],
            page: data.page,
            hasMoreItems: data.page < data.total_pages ? true : false
          })
      })
  }

  //usuniecie serialu wybranego
  // removePickedShow(){
    // this.setState({
    //   pickedShow: null,
    //   similarSeries: null
    // })
  // }


  //uzywany do powrotu do strony glownej
  resetPage(){
    this.setState({
      results: null,
      pickedShow: null,
      similarSeries: null,
      hasMoreItems: true,
      page: 1,
      genreOrSearchLabel: "",
      genreId: 0,
      items: []
    })
  }

  //lub enter na searchbarze
  searchSeries(val){
    var query = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&query=${val}&page=1`
    axios.get(query)
      .then(({ data }) => {
        this.setState({
          results: data['results'],
          genreId: 'series',
          genreOrSearchLabel: `Search for: ${val}`,
          items: [],
          pickedShow: null
        })
      })
  }

  // wybranie serialu po wygenerowaniu serialow danego gatunku
  pickShow(id){
    document.body.scrollTop = document.documentElement.scrollTop = 0; //scrolluje do poczatku strony

    var query = `https://api.themoviedb.org/3/tv/${id}?api_key=${API_KEY}&language=en-US'`
    var querySimilar = `https://api.themoviedb.org/3/tv/${id}/similar?api_key=${API_KEY}&language=en-US&page=1`

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
                          // removeShow={this.removePickedShow.bind(this)}
                          />

    if(this.state.genreId !== 0 && this.state.pickedShow === null){
      // wybrano gatunek seriali do wyswietlenia

      const loader = <div className="loader" style={{color:'white'}}>Loading ...</div>;

        if(this.state.results !== null){
        this.state.results.forEach((r) => {
          if(r.poster_path !== null){
            this.state.items.push(
              <div className="col-md-3 my-3" key={r.id} style={{display:'inline-block'}}>
            	  <img className='media-object' id="seriesItem"
                  src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`}
                  alt="" style={{width:'75%', cursor:'pointer'}} onClick={()=>this.pickShow(r.id)}/>
              </div>
            );
          }
        });
      }

      const opt = <div key={this.state.page}>
                    <p id="genreOrSearchLabel">{this.state.genreOrSearchLabel}</p>

                    <InfiniteScroll key={this.state.page}
                       pageStart={0}
                       next={this.loadMoreSeries}
                       hasMore={this.state.hasMoreItems}
                       loader={loader}>
                          {this.state.items}
                    </InfiniteScroll>
                  </div>

          return (<div>
            <NavigationBar pickShow={this.pickShow.bind(this)}
              resetPage={this.resetPage.bind(this)}
              searchSeries={this.searchSeries.bind(this)}/>
            <div style={{width:'100%'}}>
              <div style={{width:'15%', float:'left', display:'inline-block'}}>{genresMenu}</div>
              <div style={{float:'left' ,display:'inline-block', width:'85%'}}>{opt}</div>
            </div>
          </div>
                  )
    }else if(this.state.pickedShow !== null){
      // wybrano serial do wyswietlenia

      const opt = <SeriesItemDetails pickedShow={this.state.pickedShow}
        similarSeries={this.state.similarSeries}
        pickShow={this.pickShow.bind(this)}
        authUser={this.state.authUser}
                  />

      return (<div>
        <NavigationBar pickShow={this.pickShow.bind(this)}
          resetPage={this.resetPage.bind(this)}
          searchSeries={this.searchSeries.bind(this)}/>
        <div style={{width:'100%'}}>
          <div style={{width:'15%', float:'left', display:'inline-block'}}>{genresMenu}</div>
          <div style={{float:'left' ,display:'inline-block', width:'85%'}}>{opt}</div>
        </div>
      </div>
     )

    }else if(this.state.results === null){
      // nie wybrano gatunku seriali ani serialu do wyswietlenia (poczatek strony .....)

      return  <div>
        <NavigationBar pickShow={this.pickShow.bind(this)}
          resetPage={this.resetPage.bind(this)}
          searchSeries={this.searchSeries.bind(this)}/>
            <div style={{width:'100%'}}>
              <div style={{width:'15%', float:'left', display:'inline-block'}}>{genresMenu}</div>

              <div style={{float:'left', display:'inline-block', width:'85%'}}>
                <UserSeriesList authUser={this.state.authUser} pickShow={this.pickShow.bind(this)} />
                <PopularSeriesList authUser={this.state.authUser} pickShow={this.pickShow.bind(this)} />

              </div>
        </div>

      </div>

    }


  }

}

export default MainContent;
