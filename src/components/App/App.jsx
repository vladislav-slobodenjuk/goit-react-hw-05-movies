// import logo from './logo.svg';
// import s from './app.module.css';
import { Route } from 'react-router-dom';

import Container from 'components/Container/Container';
import Appbar from 'components/AppBar/AppBar';
import HomePage from 'pages/HomePage';

export default function App() {
  return (
    <Container>
      <Appbar />
      <Route path="/" exact>
        <HomePage />
      </Route>
    </Container>
    // <div className={s.App}>
    //   <Navigation />
    //   <header className={s.AppHeader}>
    //     <img src={logo} className={s.AppLogo} alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className={s.AppLink}
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}
