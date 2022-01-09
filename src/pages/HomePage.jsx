import { useState, useEffect } from 'react';

import { fetchTrending } from 'services/movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    fetchTrending('week').then(setMovies);
  }, []);

  console.log('movies from homepage', movies);

  return (
    <>
      <h1>Home Page main title Daily Trending</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </>
  );
}
