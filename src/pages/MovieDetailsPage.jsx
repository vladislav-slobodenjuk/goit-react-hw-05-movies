import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchById } from 'services/movies-api';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  // const { poster_path, title, popularity, overview } = movie;

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchById(movieId);
        setMovie(result);
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchById(movieId).then(setMovie);
  }, [movieId]);

  console.log('Movie Details Page', movie);

  return (
    <>
      {/* <h1>{`Movie ${movieId} Details Page`}</h1> */}
      {movie && (
        <div style={{ display: 'flex' }}>
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              alt={movie.title}
              style={{ minWidth: 250 }}
            />
          </div>
          <div style={{ paddingLeft: 20 }}>
            <h1>{movie.title}</h1>
            <p>User Score: {movie.popularity}%</p>
            <h2>Overview</h2>
            <p>{movie.overview}</p>
            <h2>Genres</h2>
            <p>{movie.genres.map(genre => `${genre.name} `)}</p>
          </div>
        </div>
      )}
    </>
  );
}
