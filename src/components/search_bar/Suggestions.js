import React from 'react'
import ReactDOM from 'react-dom';
import './search_bar.css';
import SeriesItemDetails from '../series/SeriesItemDetails';


function processSelection(seriesId) {
    // console.log(seriesId)
    alert(seriesId)
    // ReactDOM.render(<SeriesItemDetails seriesId={seriesId} />, document.getElementById('container'));
}

function onBlur() {
  console.log("BLUR")
  document.getElementById("suggContainer").style.display='none'
}

function getYear(date){
// (`${r.first_air_date}`.substring(0,4))

  return date.substring(0,4);
}

const Suggestions = (props) => {
  const options = props.results.map(r => (
  // onMOUSE DOWN ZAMIAST ONCLICK w suggestion nie wiem dlaczego
  r.poster_path !== null ?
    <div className="suggestion" key={r.id} style={{height:'80px'}}
      onMouseDown={()=>processSelection(r.id)}>
      <span style={{float:'left'}}>{r.name} ({getYear(`${r.first_air_date}`)})</span>
      <img src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`} alt=""
        style={{width:'50px', height:'80px', position:'absolute', right:'5px'}}/>
	  </div>
  : <span key={r.id}></span>

  ))
  return <div id="suggContainer" className="suggestionContainer--open">
          <div className="suggestionList" id="suggList">{options}</div>
        </div>
}

export default Suggestions
