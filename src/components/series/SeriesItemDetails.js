import React, { Component } from 'react';
import axios from 'axios';


class SeriesItemDetails extends Component {
  constructor(props) {
    super(props);
    console.log("PROPS")
    console.log(props)
    this.state = {
      details: [],
      id: props.seriesId
    };
  }

  componentDidMount() {
    axios.get(`https://api.themoviedb.org/3/tv/${this.state.id}?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US'`)
      .then(({ data }) => {
        this.setState({
          details: data
        })
      })
  }

  //   details['seasons'] = data['seasons'].length;

  render(){
    console.log(this.state.id)
    console.log(this.state.details['name'])


    return <div>
              <div id="seriesName">{this.state.details['name']}</div>
              <div id="seriesOverview">{this.state.details['overview']}</div>
              <img src={`http://image.tmdb.org/t/p/w185/${this.state.details['poster_path']}`} alt="" />
              <div id="voteCount">{this.state.details['vote_count']}</div>
              <div id="voteAverage">{this.state.details['vote_average']}</div>

            </div>
  }
}


//
// const SeriesItemDetails = (props) => {
//
//
//   // console.log(props.seriesId)
//   let QUERY = 'https://api.themoviedb.org/3/tv/' +props.seriesId+'?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US';
//   let name = "elo";
//   let details = {};
//
//   axios.get(`${QUERY}`)
//     .then(({ data }) => {
//     // console.log(data['genres']);
//     // console.log(data)
//     name = data['original_name'];
//     details['overview'] = data['overview'];
//     details['poster_path'] = data['poster_path'];
//     details['genres'] = data['genres'];
//     details['vote_average'] = data['vote_average'];
//     details['vote_count'] = data['vote_count'];
//     details['seasons'] = data['seasons'].length;
//
//     })
//     // console.log(details)
//     // console.log(name)
//     // // details['genres'].forEach(e => console.log(e))
//     // console.log(details)
//
//
//   return <div>{QUERY}</div>
//
// }

export default SeriesItemDetails;
