import React from 'react';

import classes from './Movie.module.css';

const Movie = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.releaseDate}</h3>
      <p>{props.openingText}</p>
      {/* since all of these prop names are different than the actual "model / api's names, we have to convert the names when we retrieve the data: SEE App.js!"  */}
    </li>
  );
};

export default Movie;
