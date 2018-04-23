import React from 'react'
import './search_barcss.css';


function processSelection(seriesId) {
    console.log(seriesId)
}

function onBlur() {
  console.log("BLUR")
  document.getElementById("suggList").style.display='none'
}

function getYear(date){
// (`${r.first_air_date}`.substring(0,4))

  return date.substring(0,4);
}

const Suggestions = (props) => {
  const options = props.results.map(r => (
    // <li key={r.id}>
  r.poster_path !== null ?
    <div className="suggestion" key={r.id} style={{height:'80px'}}
    onClick={()=>processSelection(r.id)}>
      <span style={{float:'left'}}>{r.name} ({getYear(`${r.first_air_date}`)})</span>
      <img src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`} alt=""
        style={{width:'50px', height:'80px', position:'absolute', right:'5px'}}/>
	  </div>
  : <span key={r.id}></span>
    // </li>
  ))
  return <div className="suggestionList" id="suggList" onBlur={this.onBlur}>{options}</div>
}

export default Suggestions
