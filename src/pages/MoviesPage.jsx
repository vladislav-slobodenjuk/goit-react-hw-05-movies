import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { ImSearch } from 'react-icons/im';

import { fetchByKeyWord } from 'services/movies-api';

export default function MoviesPage() {
  const [searchInput, setSearchInput] = useState('');
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(null);
  const { url } = useRouteMatch();
  // console.log(url);

  // const query = useRef('');
  // console.log(query);

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
    setQuery(searchInput);
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
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchByKeyWord('week').then(setMovie);
  }, [query]);

  // console.log('movies from search Movies page', movies);

  return (
    <>
      <h1>Movies Page main title</h1>
      <form onSubmit={handleSubmit}>
        <input
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
