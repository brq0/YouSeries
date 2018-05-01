import React, { Component } from 'react';
import axios from 'axios';
import SeriesGenerator from './SeriesGenerator'
import ReactDOM from 'react-dom';

class SeriesOfAGenre extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      id: props.genreId
    };
  }

  componentDidMount() {
    var query = 'https://api.themoviedb.org/3/discover/tv?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&sort_by=popularity.desc&with_genres='
              + this.state.id;

    axios.get(query)
      .then(({ data }) => {
        console.log(data)
        this.setState({
          results: data['results']
        })
      })

      console.log(this.state.results)

  }


  render(){
    return <div>
              <SeriesGenerator results={this.state.results} />;
            </div>
  }
}

export default SeriesOfAGenre;
