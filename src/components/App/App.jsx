// import logo from './logo.svg';
// import s from './app.module.css';

import Container from 'components/Container/Container';
import Appbar from 'components/AppBar/AppBar';

export default function App() {
  return (
    <Container>
      <Appbar />
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
