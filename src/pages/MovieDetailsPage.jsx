import { useState, useEffect, lazy, Suspense } from 'react';
import {
  useParams,
  useRouteMatch,
  Link,
  Route,
  useHistory,
  useLocation,
} from 'react-router-dom';
import { fetchById } from 'services/movies-api';
import Spinner from 'components/Spinner/Spinner';

const MovieCastSubPage = lazy(() =>
  import('./MovieCastSubPage' /* webpackChunkName: "MovieCastSubPage" */),
);
const MovieReviewsSubPage = lazy(() =>
  import('./MovieReviewsSubPage' /* webpackChunkName: "MovieReviewsSubPage" */),
);

export default function MovieDetailsPage() {
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const { url, path } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  console.log('MovieDetailsPage location :>> ', location);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchById(movieId);
        setMovie(result);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [movieId]);

  const onGoBack = () => {
    history.push(location?.state?.from ?? '/');
  };

  return (
    <>
      {movie && (
        <>
          <button
            type="button"
            onClick={onGoBack}
            style={{ marginBottom: '15px' }}
          >
            {location?.state?.label ?? 'Go back'}
          </button>
          <div style={{ display: 'flex' }}>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                alt={movie.title}
                style={{ minWidth: 250 }}
              />
            </div>
            <div style={{ paddingLeft: 20 }}>
              <h1>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h1>
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
                <Link
                  to={{
                    pathname: `${url}/cast`,
                    state: location.state,
                  }}
                >
                  Cast
                </Link>
              </li>
              <li>
                <Link
                  to={{
                    pathname: `${url}/reviews`,
                    state: location.state,
                  }}
                >
                  Reviews
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
      <hr />

      <Suspense fallback={<Spinner />}>
        <Route path={`${path}/cast`}>
          {movie && <MovieCastSubPage id={movieId} />}
        </Route>

        <Route path={`${path}/reviews`}>
          {movie && <MovieReviewsSubPage id={movieId} />}
        </Route>
      </Suspense>
    </>
  );
}
