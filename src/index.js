import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar/search_bar';
import GenresMenu from './components/genres_menu/genres_menu';

const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

const App = () => {
  return (<div>
          <SearchBar />
          <div>{Query}</div>
        </div>)
}

ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(<GenresMenu />, document.getElementById('genres_menu'));
