import React from 'react'
import ReactDOM from 'react-dom';

const SeriesGenerator = (props) => {
  console.log(props)
  const options = props.results.map(r => (
  // onMOUSE DOWN ZAMIAST ONCLICK w suggestion nie wiem dlaczego
  r.poster_path !== null ?
    <div key={r.id} style={{height:'80px', float:'left', marginRight:'5px'}}>
      <img src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`} alt=""
        style={{width:'50px', height:'80px'}}/>
	  </div>
  : <span key={r.id}></span>

  ))
  return <div style={{ overflow: 'hidden',
     whiteSpace: 'nowrap'}}>
          <div>{options}</div>
        </div>
}

export default SeriesGenerator;
