import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useRouteMatch } from 'react-router-dom';

import { fetchTrending } from 'services/movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  // const {url} = useRouteMatch();

  // console.log(url);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchTrending('week');
        setMovies(result);
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchTrending('week').then(setMovies);
  }, []);

  console.log('movies from homepage', movies);

  return (
    <>
      <h1>Home Page main title Daily Trending</h1>
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
