import React from 'react'
import ReactDOM from 'react-dom';
import './series_of_a_genre.css';

function onSeriesClick(id, props){
  // alert(id)
  props.pickShow(id)
}

const SeriesGenerator = (props) => {
  let options = props.results.filter(r=> r.poster_path).map(r => (

  <li className='list-group-item' style={{display:'inline-block', marginTop:'10px'}} key={r.id}>
    <div className='video-list media'>
    <div className='media-left'>
      <img className='media-object' id="seriesItem"
       src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`}
        alt="" style={{width:'75%'}} onClick={()=>onSeriesClick(r.id, props)}/>
	  </div>
    </div>
  </li>

  ))




  return <div>
          <div>{options.filter(e=> e !== null)}</div>
        </div>
}

export default SeriesGenerator;
