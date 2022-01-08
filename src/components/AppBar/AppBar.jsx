import Navigation from 'components/Navigation/Navigation';
import s from './AppBar.module.scss';

export default function Appbar() {
  return (
    <header className={s.header}>
      <Navigation />
    </header>
  );
}
