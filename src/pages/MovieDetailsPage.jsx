import { useState, useEffect } from 'react';
import { useParams, useRouteMatch, Link, Route } from 'react-router-dom';
import { fetchById } from 'services/movies-api';
import MovieCastSubPage from './MovieCastSubPage';
import MovieReviewsSubPage from './MovieReviewsSubPage';

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();

  // const { poster_path, title, popularity, overview } = movie;

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchById(movieId);
        setMovie(result);
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchById(movieId).then(setMovie);
  }, [movieId]);

  // console.log('Movie Details Page', movie);

  return (
    <>
      {/* <h1>{`Movie ${movieId} Details Page`}</h1> */}
      {movie && (
        <>
          <button type="button">Go back</button>
          <div style={{ display: 'flex' }}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
                style={{ minWidth: 250 }}
              />
            </div>
            <div style={{ paddingLeft: 20 }}>
              <h1>{movie.title}</h1>
              <p>User Score: {movie.vote_average * 10}%</p>
              <h2>Overview</h2>
              <p>{movie.overview}</p>
              <h2>Genres</h2>
              <p>{movie.genres.map(genre => `${genre.name} `)}</p>
            </div>
          </div>
          <hr />
          <div>
            <p>Additional information</p>
            <ul>
              <li>
                <Link to={`${url}/cast`}>Cast</Link>
              </li>
              <li>
                <Link to={`${url}/reviews`}>Reviews</Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <hr />

      <Route path={`${path}/cast`}>
        {movie && <MovieCastSubPage id={movieId} />}
      </Route>

      <Route path={`${path}/reviews`}>
        {movie && <MovieReviewsSubPage id={movieId} />}
      </Route>
    </>
  );
}