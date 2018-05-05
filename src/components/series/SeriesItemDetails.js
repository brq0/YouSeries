import React, { Component } from 'react';
import axios from 'axios';
import './series_items_style.css';


function onSeriesClick(id, props){
  props.pickShow(id)
}

const SeriesItemDetails = (props) =>{
  var show = props.pickedShow;
  var similarSeries = props.similarSeries.results;

  var year = show.first_air_date.substring(0,4);
  var genres = show.genres.map(e=><p key={e.id}>{e.name}</p>)

  const seriesDetails = (<div>
                              <div id="seriesName">{show['name']}</div>
                              <div id="yearOfSeries">Year: {year}</div>
                              <div id="seriesOverview">Overview: {show['overview']}</div>
                              <div id="seasonsAmount">Seasons: {show['seasons'].length}</div>
                              <img src={`http://image.tmdb.org/t/p/w185/${show['poster_path']}`} alt="" />
                              <div id="seriesGenres">Genres: {genres}</div>
                              <div id="voteCount">Number of votes: {show['vote_count']}</div>
                              <div id="voteAverage">Average vote: {show['vote_average']}</div>
                          </div>)
  if(similarSeries !== undefined){
    return <div className="seriesItemDetails">
            {seriesDetails}

            <br/>
            <p id="similarSeriesLabel">Similar series:</p>
            <div id="similarSeries">
              <img src={`http://image.tmdb.org/t/p/w185/${similarSeries['0'].poster_path}`}
                    style={{cursor:'pointer'}}
                    alt="" onClick={()=>onSeriesClick(similarSeries['0'].id, props)}/>
              </div>
           </div>
  }else{
    return <div className="seriesItemDetails">
            {seriesDetails}
           </div>
    }

}

export default SeriesItemDetails;
