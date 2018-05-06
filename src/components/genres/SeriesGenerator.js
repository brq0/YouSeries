import React from 'react'
import ReactDOM from 'react-dom';
import './series_of_a_genre.css';

function onSeriesClick(id, props){
  // alert(id)
  props.pickShow(id)
}

const SeriesGenerator = (props) => {
  let options = props.results.filter(r=> r.poster_path).map(r => (

  <div className="col-md-3 my-3" key={r.id}>
	  <img className='media-object' id="seriesItem"
	   src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`}
		alt="" style={{width:'75%'}} onClick={()=>onSeriesClick(r.id, props)}/>
  </div>

  ))




  return <div className="container">
		  <div className="row">
			{options.filter(e=> e !== null)}
		  </div>
        </div>
}

export default SeriesGenerator;
