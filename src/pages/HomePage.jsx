import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { fetchTrending } from 'services/movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchTrending();
        setMovies(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <>
      <h1>Trending Today</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
