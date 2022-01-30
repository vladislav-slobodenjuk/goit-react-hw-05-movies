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

  console.log('MoviesPage location :>> ', location);

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
        }

        setMovies(result);
        history.replace({ ...location, search: `query=${query}` });

        console.log('history :>> ', history);
        console.log('location :>> ', location);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [query]);

  useEffect(() => {
    if (location.search === '') {
      return;
    }

    setQuery(queryString.parse(location.search).query);
  }, [location]);

  return (
    <>
      <h1>Enter Movies to search</h1>
      <form onSubmit={handleSubmit}>
        <input
          style={{ marginRight: 5 }}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
          value={searchInput}
          onChange={handleInputChange}
        />

        <button type="submit">
          <ImSearch />
        </button>
      </form>

      {movies && (
        <ul>
          {movies.map(movie => (
            <li key={movie.id}>
              <Link
                to={{
                  pathname: `${url}/${movie.id}`,
                  state: {
                    from: location,
                    label: 'Back to Search',
                  },
                }}
              >
                {movie.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
