import React, { Component } from 'react';
import { firebase } from '../firebase';
import CarouselSlider from "react-carousel-slider";

import $ from 'jquery';


class UserSeriesList extends Component{
  constructor(props){
    super(props);

    this.state = {
      user: props.authUser.uid,
      userSeries: 0,
      propz: props,
    }
  }

  componentDidMount() {
    firebase.app.database().ref(`items/${this.state.user}/`).on('value', snapshot => {

      this.setState({
        userSeries: snapshot.val()
      })
    });

  }

  onSeriesClick(id){
    this.state.propz.pickShow(id)
  }

  seriesLabelClicked(){
    $('#fullUserSeriesList').slideToggle('slow')
    $('#userSeriesList').toggle();
  }

  render(){
    var keyNames = null;

    if(this.state.userSeries !== 0){
        if(this.state.userSeries !== null){
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

        keyNames = Object.keys(this.state.userSeries);

        if(keyNames !== null){
              keyNames.map(e=>{
                series.push(
                  <div> <img src={this.state.userSeries[e]} className="seriesImg" alt=""
                    onClick={()=>this.onSeriesClick(e)}/> </div>
                )
              })

              fullList = keyNames.map(e => (
                  <div className="col-md-3 my-3" key={e} style={{display:'inline-block'}}>
                    <img className='media-object' id="seriesItem"
                     src={this.state.userSeries[e]}
                    alt="" style={{width:'75%', border:'1px solid white'}} onClick={()=>this.onSeriesClick(e)}/>
                  </div>
                ))
        }



      return <div className="seriesItemList">
                <div style={{borderBottom: '1px solid #d7d7d7', marginBottom:'5px', marginTop:'none'}}>
                    <p id="userSeriesLabel" onClick={()=>this.seriesLabelClicked()}>Your series:</p>
                </div>
                <div id="userSeriesList">
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

              <div id="fullUserSeriesList" style={{color:'white', display:'none'}}>
                <div>
                  <div>
                    {fullList}
                  </div>
                </div>
              </div>
          </div>
      }else{
        return <div style={{color: 'white'}}> Nie wybrano seriali </div>
      }

    }else{
      // wczytywanie lub cos sie popsulo
      return <div style={{color:'white'}}></div>
    }


  }
}


export default UserSeriesList;
