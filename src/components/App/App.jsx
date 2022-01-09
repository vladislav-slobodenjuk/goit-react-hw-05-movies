// import logo from './logo.svg';
// import s from './app.module.css';
import { Route, Switch, Redirect } from 'react-router-dom';

import Container from 'components/Container/Container';
import Appbar from 'components/AppBar/AppBar';
import HomePage from 'pages/HomePage';
import MoviesPage from 'pages/MoviesPage';
// import NotFoundPage from 'pages/NotFoundPage';

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

        <Redirect to="/" />

        {/* <Route>
          <NotFoundPage />
        </Route> */}
      </Switch>
    </Container>
  );
}
