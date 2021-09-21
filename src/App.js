import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import AddMovie from "./components/AddMovie";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      // const response = await fetch("https://swapi.dev/api/films/");
      const response = await fetch('https://react-udemy-http-fd441-default-rtdb.firebaseio.com/movies.json');
      // note the ".../movies.json"
      
      if (response.status !== 200) {
        throw new Error('Oops. Something went wrong!');
      }
      
      const data = await response.json();
      
      const transformedMovies = data.results.map((movieData) => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingText: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false); // we want to setIsLoading to false whether we have a failed HTTP request or retrieved a successsful request.
  }, []);

  useEffect( () => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  function addMovieHandler(movie) {
    console.log(movie);
  }
  
  let content = <p>No movies found.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>

  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie = {addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        { content }
        {/* able to replace all these next 4 lines with the variable "content" */}
        {/* { !isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        { !isLoading && movies.length === 0 && !error && <p> No movies found. </p>}
        { !isLoading && error && <p>{error}</p> }
        { isLoading && <p> Loading...</p> } */}
      </section>
    </React.Fragment>
  );
}

export default App;
