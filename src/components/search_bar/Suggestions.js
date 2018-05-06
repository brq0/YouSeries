import React from 'react'
import ReactDOM from 'react-dom';
import './search_bar.css';
import SeriesItemDetails from '../series/SeriesItemDetails';


function processSelection(seriesId, props) {
    console.log(seriesId)
    props.pickShow(seriesId)
}

function onBlur() {
  document.getElementById("suggContainer").style.display='none'
}

function getYear(date){
  return date.substring(0,4);
}

const Suggestions = (props) => {
  const options = props.results.map(r => (
  // onMOUSE DOWN ZAMIAST ONCLICK w suggestion nie wiem dlaczego - ja wiem
  r.poster_path !== null ?
    <div className="suggestion" key={r.id}
      onMouseDown={()=>processSelection(r.id, props)}>
      <span>{r.name} ({getYear(`${r.first_air_date}`)})</span>
      <img src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`} alt=""
        style={{width:'60px', height:'80px', position:'absolute', right:'5px'}}/>
	  </div>
  : <span key={r.id}></span>

  ))
  return <div id="suggContainer" className="suggestionContainer--open">
          <div className="suggestionList" id="suggList">{options}</div>
        </div>
}

export default Suggestions
