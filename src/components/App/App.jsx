import { lazy, Suspense } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Container from 'components/Container/Container';
import Appbar from 'components/AppBar/AppBar';
import Spinner from 'components/Spinner/Spinner';

const HomePage = lazy(() =>
  import('pages/HomePage' /* webpackChunkName: "home-page" */),
);
const MoviesPage = lazy(() =>
  import('pages/MoviesPage' /* webpackChunkName: "movie-page" */),
);
const MovieDetailsPage = lazy(() =>
  import('pages/MovieDetailsPage' /* webpackChunkName: "movie-details-page" */),
);

export default function App() {
  return (
    <Container>
      <Appbar />

      <Suspense fallback={<h1>Loading...</h1>}>
        {/* <Suspense fallback={Spinner}> */}
        <Switch>
          <Route path="/" exact>
            <HomePage />
          </Route>

          <Route path="/movies" exact>
            <MoviesPage />
          </Route>

          <Route path="/movies/:movieId">
            <MovieDetailsPage />
          </Route>

          <Redirect to="/" />
        </Switch>
      </Suspense>
    </Container>
  );
}
