import React from 'react';
import ReactDOM from 'react-dom';

import SearchBar from './components/search_bar/search_bar';
import GenresMenu from './components/genres_menu/genres_menu';
import NavigationBar from './components/navigation_bar/navigation_bar';

const TMDB_API_KEY = 'f32b6b18b2054226bbfb00dfeda586c7';
let Query = "https://api.themoviedb.org/3/genre/tv/list?api_key="+TMDB_API_KEY;

const App = () => {
  return (
    <div>
      <NavigationBar />
      <div>
        {Query}
      </div>
      <GenresMenu />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
