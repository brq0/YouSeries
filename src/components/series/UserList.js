import React, { Component } from 'react';
import { firebase } from '../firebase';
import CarouselSlider from "react-carousel-slider";

const UserList = ({userSeries}) =>{




  if(userSeries !== 0){
    if(userSeries !== null && userSeries !== undefined){
      console.log(userSeries)

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

      var keyNames = Object.keys(userSeries);

      keyNames.map(e=>{
        series.push(
          <div>
            <img src={userSeries[e]} key={e}
                className="seriesImg"
                alt=""/>
          </div>
        )
    })

    // const err = {}
    // let de = [];
    // keyNames.map(e=> err['imgSrc'] = userSeries[e])
    //
    // keyNames.map(e => {
    //   var obj = new Object()
    //   obj['id'] = +e;
    //   obj['poster_path'] = userSeries[e];
    //   // obj[e] = userSeries[e];
    //   de.push(obj)
    // })
    // console.log(de)
    //
    // let seriesItems = []
    //
    // de.map(e => {
    //
    //     seriesItems.push(
    //       <div>
    //         <img src={e.poster_path}
    //             className="seriesImg"
    //             alt=""
    //             key={e.id} />
    //       </div>
    //     )
    //
    // });
    //
    // console.log(seriesItems)


    return <div className="seriesItemDetails">
              <p id="similarSeriesLabel">Similar series:</p>


                  <CarouselSlider
                    accEle = {{dots: false}}
                    manner={{ circular: true }}
                    slideCpnts = {series}
                    sliderBoxStyle={sliderBoxStyle}
                    buttonSetting={buttonSetting}

                  />


        </div>
    }
    else{
      <div style={{color:'white'}}>Nie wybrano seriali</div>
    }

  }else{
    return <div style={{color:'white'}}>COS SIE POPSULO</div>
  }
}

export default UserList;
