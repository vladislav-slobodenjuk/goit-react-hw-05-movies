// import logo from './logo.svg';
// import s from './app.module.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Container from 'components/Container/Container';
import Appbar from 'components/AppBar/AppBar';
import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
import MovieDetailsPage from 'pages/MovieDetailsPage';

export default function App() {
  return (
    <Container>
      <Appbar />

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
    </Container>
  );
}
