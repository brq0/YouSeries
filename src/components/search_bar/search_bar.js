import React, { Component } from 'react';
import axios from 'axios'
import Suggestions from './Suggestions'
import './search_barcss.css';

const { API_KEY } = 'f32b6b18b2054226bbfb00dfeda586c7'
const API_URL = 'https://api.themoviedb.org/3/search/tv'

class SearchBar extends Component {
  state = {
    query: '',
    results: []
  }

  getInfo = () => {
    axios.get(`${API_URL}?api_key=f32b6b18b2054226bbfb00dfeda586c7&query=${this.state.query}&limit=7`)
      .then(({ data }) => {
		  console.log(data['results']);
        this.setState({
          results: data['results']
        })
      })
  }

  onFocus = () => {
      document.getElementById("suggContainer").style.display='block'
  }

  onBlur = () => {
    document.getElementById("suggContainer").style.display='none'
  }

  onKeyPressed = (e) => {
    if (e.key === 'Enter') {
      console.log('do validate');
    }
  }

  handleInputChange = () => {
	  // console.log(this.search.value.length>1);
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
      <div onBlur={this.onBlur}>
      <div className="searchContainer">
        <input className="searchInput"
          placeholder="Search for..."
          ref={input => this.search = input}
          onKeyPress={this.onKeyPressed}
          onChange={this.handleInputChange}
          onFocus={this.onFocus}
        />
        <div className="suggestionContainer--open" id="suggContainer">
          <Suggestions results={this.state.results} />
        </div>
      </div>
      </div>
    )
  }
}
export default SearchBar;
