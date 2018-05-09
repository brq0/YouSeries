import React, { Component } from 'react';
import axios from 'axios';
import './series_items_style.css';
import ReactCountryFlag from 'react-country-flag';
import CarouselSlider from "react-carousel-slider";
import AddRemoveButton from "./addRemoveButton";

import { firebase } from '../firebase';


function onSeriesClick(id, props){
  props.pickShow(id)
}


const SeriesItemDetails = (props) =>{
  let countries = require("i18n-iso-countries");
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  var show = props.pickedShow;
  var similarSeries = props.similarSeries !== null ? props.similarSeries.results : null;

  var year = show.first_air_date !== null ? show.first_air_date.substring(0,4) : "";
  var genres = show.genres.map(e=><span className="genresDisplay" key={e.id}>{e.name}</span>);
  var productionCountries = show.origin_country.map(e=>
                            <div key={e}>
                              <ReactCountryFlag style={{display:'inline'}} code={e} svg/>
                              <span style={{paddingLeft: '3px'}}>{countries.getName(e, "en")}</span>
                            </div>);

  const seriesDetails = (<div className="container pageLook">
							<div className="row my-3">
  						  	  <div className="col-md-2,5">
							  <div className="mx-3">
								<img src={`http://image.tmdb.org/t/p/w185/${show['poster_path']}`} alt="" /><br /><br />
                              <h5><div id="voteCount">Votes: {show['vote_count']}</div></h5>
                              <h5><div id="voteAverage">Score: {show['vote_average']}</div></h5><br />
							  </div>
							  </div>
						  <div className="col-md-8 pageLook">
                              <h1><div id="seriesName" className="font-weight-bold" >{show['name']}</div></h1>
                              <h5><div id="yearOfSeries">Year: {year}</div></h5>
							  <div id="seasonsAmount">Seasons: {show['seasons'].length}</div><br />
                              <div id="seriesOverview"><h6>Overview: </h6>{show['overview']}</div><br />
                              <div id="seriesGenres"><h6>Genres: </h6>{genres}</div><br />
                              <div id="seriesProductionCountries"><h6>Country: </h6>{productionCountries} </div>
                          </div>
						  <div className="col-md-1">
                <AddRemoveButton id={show.id} key={show.id} authUser={props.authUser} posterPath={`http://image.tmdb.org/t/p/w185/${show['poster_path']}`}/>
						  </div>
						 </div>
						</div>)

  if(similarSeries !== null && similarSeries['0'] !== undefined){
      let buttonSetting = {
          placeOn: "middle-inside",
          hoverEvent: true,
          style: {
            left: {
                  height: "50px",
                  width: "50px",
                  color: "#929393",
                  background: "rgba(225, 228, 232, 0.8)",
                  borderRadius: "50%"
                  },
            right: {
                  height: "50px",
                  width: "50px",
                  color: "#929393",
                  background: "rgba(225, 228, 232, 0.8)",
                  borderRadius: "50%"
                  }
          }
      };

      let sliderBoxStyle = {
        height: "20%",
        width: "95%",
        background: "transparent",
      };

      let itemsStyle = {
          height: "60%",
          background: "transparent",
          border: "1px solid #e1e4e8",
          borderRadius: "2px"
      };

      let customSlideCpnts = []

      similarSeries.map(e => {
        if(e.poster_path !== null){
          customSlideCpnts.push(
            <div>
              <img src={`http://image.tmdb.org/t/p/w185/${e.poster_path}`}
                  className="seriesImg"
                  alt="" onClick={()=>onSeriesClick(e.id, props)}/>
            </div>
          )
        }
      });

    return <div className="seriesItemDetails">
              {seriesDetails}

              <br/>
              <p id="similarSeriesLabel">Similar series:</p>
              <div id="similarSeries">
                  <div style={{ width: "100%", margin: "0 auto", position: "relative" }}>
                    <CarouselSlider key={similarSeries['0'].id}
                      accEle = {{dots: false}}
                      manner={{ circular: true }}
                      slideCpnts = {customSlideCpnts}
                      sliderBoxStyle={sliderBoxStyle}
                      buttonSetting={buttonSetting}
                      itemsStyle = {itemsStyle}
                    />
                 </div>
             </div>
           </div>
  }else{
    return <div className="seriesItemDetails">
            {seriesDetails}
           </div>
    }

}

export default SeriesItemDetails;
