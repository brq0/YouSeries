import React, { Component } from 'react';
import { firebase } from '../firebase';
import CarouselSlider from "react-carousel-slider";


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

        let series = [];

        keyNames = Object.keys(this.state.userSeries);

        if(keyNames !== null){
          keyNames.map(e=>{
            series.push(
              <div> <img src={this.state.userSeries[e]} className="seriesImg" alt=""
                onClick={()=>this.onSeriesClick(e)}/> </div>
            )
        })
      }

      return <div className="seriesItemDetails">
                <p id="userSeriesLabel">Your series:</p>
                <div id="userSeriesList">
                    <div style={{ width: "100%", float:'right'}}>
                    <CarouselSlider
                      accEle = {{dots: false, flag: true}}
                      manner={{ circular: true }}
                      slideCpnts = {series}
                      sliderBoxStyle={sliderBoxStyle}
                      buttonSetting={buttonSetting}

                    />
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
