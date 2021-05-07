import React, {useState, useEffect} from "react";
import {Text, Button, View} from "react-native";
//import './App.css';

const Movie_URL = "https://www.omdbapi.com/?s=man&apikey=28f4dae9";

const Movie = ({movie}) => {
  const poster = movie.Poster;
  return (
    <div className="movie">
     <h2>{movie.Title}</h2>
     <div>
        <img 
        width="200" 
        alt={'The movie titled: ${movie.Title}'}
        src={poster}
        />
     </div>
     <p>({movie.Year})</p>
    </div>
  );
};

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("");
  
  const handleSearchInputChanges = (e) => {
    setSearchValue(e.target.value);
  }

  const resetInputField = () => {
    setSearchValue("")
  }

  const callSearchFunction = (e) => {
    e.preventDefault();
    props.search(searchValue);
    resetInputField();
  }

  return (
      <form className="search">
        <input
          value={searchValue}
          onChange={handleSearchInputChanges}
          type="text"
        />
        <input onClick={callSearchFunction} type="submit" value="SEARCH" />
      </form>
    );
}

const App = () => {
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    fetch(Movie_URL).then(response => response.json())
    .then(jsonResponse => {
      setMovie(jsonResponse.Search);
      setLoading(false);
    });
  }, []);

  const search = searchValue => {
    setLoading(true);
    setErrorMessage(null);

    fetch('https://www.omdbapi.com/?s=${searchValue}&apikey=28f4dae9')
    .then(response => response.json())
    .then(jsonResponse => {
      if (jsonResponse.Response === "True") {
        setMovie(jsonResponse.Search);
        setLoading(false);
      }else
      {
        setErrorMessage(jsonResponse.Error);
        setLoading(false);
      }
    });
  };

  return (
    <>
    <Text>Search Movie</Text>
    <Search search = {search} />
    <div className = "movies">
      {loading && !errorMessage ? (
        <span>loading...</span>
      ) : errorMessage ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        movie.map((movie, index) => (
          <Movie key = {'${index}-${movie.Title}'} movie={movie} />
        ))
      )}
    </div>
    </>
  );
};

export default App;