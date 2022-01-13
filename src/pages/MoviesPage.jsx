import { useState, useEffect } from 'react';
import { Link, useRouteMatch, useHistory, useLocation } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';
import queryString from 'query-string';

import { fetchByKeyWord } from 'services/movies-api';

export default function MoviesPage() {
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  const history = useHistory();
  const location = useLocation();

  // console.log('location', location);
  // console.log('history', history);

  const handleInputChange = e => {
    setSearchInput(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchInput.trim() === '') {
      // toast.error('Введите что будем искать');
      alert('Введите что будем искать');
      return;
    }

    // this.props.onSubmit(this.state.searchInput.trim()); // !!! trim
    // onSubmit(searchInput.trim()); // !!! trim
    setQuery(searchInput.trim());
    setSearchInput('');
  };

  useEffect(() => {
    if (query === '') {
      return;
    }

    if (query.length < 3) {
      // toast.warn('Запрос слишком короткий');
      alert('Запрос слишком короткий');

      return;
    }

    (async () => {
      try {
        const result = await fetchByKeyWord(query);

        if (result.length === 0) {
          // toast.warn('Ничего не нашли :(');
          alert('Ничего не нашли :(');
          throw new Error(`По запросу  ничего нет`);
        }

        setMovies(result);
        history.push({ ...location, search: `query=${query}` });
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchByKeyWord('week').then(setMovie);
  }, [query]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    setQuery(queryString.parse(location.search).query);
  }, [location]);

  // console.log('movies from search Movies page', movies);

  return (
    <>
      <h1>Movies Page main title</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginRight: 5 }}
          // className={s.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={searchInput} // !!!
          onChange={handleInputChange}
        />

        <button type="submit">
          {/* <button type="submit" className={s.searchFormButton}> */}
          <ImSearch />
        </button>
      </form>

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
