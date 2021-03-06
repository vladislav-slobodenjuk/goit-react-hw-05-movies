import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import slugify from 'slugify';

import { fetchTrending } from 'services/movies-api';

export default function HomePage() {
  const [movies, setMovies] = useState(null);
  const location = useLocation();

  const makeSlug = string => slugify(string, { lower: true });

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
              <Link
                to={{
                  pathname: `/movies/${makeSlug(`${movie.title} ${movie.id}`)}`,
                  state: {
                    from: location,
                    label: 'Back Home',
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
