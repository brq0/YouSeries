import React, { Component } from 'react';
import axios from 'axios'
import Suggestions from './Suggestions'
import './search_bar.css';

const API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/search/tv'

let parentProps;

class SearchBar extends Component {
  constructor(props){
    super(props)

    parentProps = props;
  }

  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get(`${API_URL}?api_key=${API_KEY}&query=${this.state.query}&limit=7`)
      .then(({ data }) => {
		  // console.log(data['results']);
        this.setState({
          results: data['results']
        })
      })
  }

  onFocus = () => {
      document.getElementById("temp").style.display='block'
  }

  onBlur = () => {

    document.getElementById("temp").style.display='none'
  }

  onKeyPressed = (e) => {
    if (e.key === 'Enter') {
      let val = document.getElementById("searchBar").value;
      if(val.length >= 2){
        parentProps.searchSeries(val);
      }
    }
  }

  handleInputChange = () => {
    if(this.search.value.length>1){
      this.onFocus();
      this.setState({
        query: this.search.value
      }, () => {
        if (this.state.query && this.state.query.length > 1) {
          if (this.state.query.length % 2 === 0) {
            this.getInfo()
          }
        } else if (!this.state.query) {
        }
      })
   }else this.onBlur();
  }

  render() {
    return (
      <div className="searchContainer" onBlur={this.onBlur}>
        <input id="searchBar" className="searchInput"
          placeholder="Search for..."
          ref={input => this.search = input}
          onKeyPress={this.onKeyPressed}
          onChange={this.handleInputChange}
          onFocus={this.onFocus}
        />
        <div id="temp">
          <Suggestions results={this.state.results} pickShow={parentProps.pickShow} />
        </div>
      </div>
      // </div>
    )
  }
}
export default SearchBar;
