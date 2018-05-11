import React from 'react';
import './genres_menu.css';


function onGenreClick(id, name, props){
  props.pickGenre(id, name)

  // props.removeShow()
}

const GenresMenu = (props) => {
  if(props.genres.length > 1){
    const genres = props.genres;
    const genresMenu = (<div className="genresContainer">
          {genres.map(genre =>
            <div key={genre.id} className="genre">
              <p onClick={()=>onGenreClick(genre.id, genre.name, props)}>{genre.name}</p>
            </div>
          )}
        </div>)
    return genresMenu;
  }

  return <div></div>
}


export default GenresMenu;
