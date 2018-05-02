import React from 'react'
import ReactDOM from 'react-dom';
// import 'bootstrap/dist/css/bootstrap.css';


// <div key={r.id} style={{height:'80px', float:'left', marginRight:'5px'}}>
//   <img src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`} alt=""
//     style={{width:'50px', height:'80px'}}/>
// </div>


const SeriesGenerator = (props) => {
  console.log(props)
  let options = props.results.map(r => (
  // onMOUSE DOWN ZAMIAST ONCLICK w suggestion nie wiem dlaczego
  r.poster_path !== null ?
  <li className='list-group-item' style={{float:'left'}} key={r.id}>
    <div className='video-list media'>
    <div className='media-left' style={{float:'left'}}>
      <img className='media-object' src={`http://image.tmdb.org/t/p/w185/${r.poster_path}`} alt="" style={{width:'75%'}}/>
	  </div>
    </div>
  </li>
  : <span>elo</span>

  ))




  return <div style={{ overflow: 'hidden',
     whiteSpace: 'nowrap'}}>
          <div>{options.filter(e=> e !== null)}</div>
        </div>
}

export default SeriesGenerator;
