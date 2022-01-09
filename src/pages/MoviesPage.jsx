import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

import { fetchByKeyWord } from 'services/movies-api';

export default function MoviesPage() {
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();

  // console.log(url);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchByKeyWord('batman');

        if (result.length === 0) {
          // toast.warn('Ничего не нашли :(');
          alert('Ничего не нашли :(');
          throw new Error(`По запросу  ничего нет`);
        }

        setMovies(result);
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchByKeyWord('week').then(setMovie);
  }, []);

  console.log('movies from search Movies page', movies);

  return (
    <>
      <h1>Movies Page main title</h1>
      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link to={`${url}/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
