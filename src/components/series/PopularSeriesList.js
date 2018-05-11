import React, { Component } from 'react';
import CarouselSlider from "react-carousel-slider";
import axios from 'axios';

import $ from 'jquery';


class PopularSeriesList extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: props.authUser.uid,
      userSeries: 0,
      propz: props,
      results: null,
    }
  }

  componentDidMount() {
    var QUERY = 'https://api.themoviedb.org/3/tv/popular?api_key=f32b6b18b2054226bbfb00dfeda586c7&language=en-US&page=1'
    axios.get(`${QUERY}`)
      .then(({ data }) => {
        this.setState({
          results: data['results']
        })
      })

  }

  onSeriesClick(id){
    this.state.propz.pickShow(id)
  }

  popularSeriesLabelClicked(){
    $('#fullPopularSeriesList').slideToggle('slow')
    $('#popularSeriesSlider').toggle();
    $('#userSeriesPanel').toggle();
    // $('#fullUserSeriesList').hide();
  }

  render(){

      if(this.state.results !== null){
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

        let series = [];
        let fullList;

        if(this.state.results !== null){
              this.state.results.forEach(e=>{
                series.push(
                  <div key={e.id*2}> <img src={`https://image.tmdb.org/t/p/w185/${e.poster_path}`} className="seriesImg" alt=""
                    onClick={()=>this.onSeriesClick(e.id)}/> </div>
                )
              })

              fullList = this.state.results.map(e => (
                  <div className="col-md-3 my-3" key={e.id*2} style={{display:'inline-block'}}>
                    <img className='media-object' id="seriesItem"
                     src={`https://image.tmdb.org/t/p/w185/${e.poster_path}`}
                    alt="" style={{width:'75%', border:'1px solid white', cursor:'pointer'}} onClick={()=>this.onSeriesClick(e.id)}/>
                  </div>
                ))
        }



      return <div className="popularSeriesItemList">
                <div style={{borderBottom: '1px solid #d7d7d7', marginBottom:'5px', marginTop:'none'}}>
                    <p id="popularSeriesLabel" onClick={()=>this.popularSeriesLabelClicked()}>Most popular series:</p>
                </div>
                <div id="popularSeriesSlider">
                    <div style={{ width: "100%", float:'right'}}>
                    <CarouselSlider
                      accEle = {{dots: false, flag: true}}
                      manner={{ circular: true }}
                      slideCpnts = {series}
                      sliderBoxStyle={sliderBoxStyle}
                      buttonSetting={buttonSetting}
                      itemsStyle = {itemsStyle}

                    />
                    </div>
              </div>

              <div id="fullPopularSeriesList" style={{color:'white', display:'none'}}>
                <div>
                  <div>
                    {fullList}
                  </div>
                </div>
              </div>
          </div>
      }else{
        return <div style={{color: 'white'}}></div>
      }

  }


}


export default PopularSeriesList;
