import { useState, useEffect } from 'react';
import { fetchAdditional } from 'services/movies-api';

export default function MovieCastSubPage({ id }) {
  const [cast, setCast] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchAdditional(id, 'credits');
        setCast(result.cast);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [id]);

  console.log('cast', cast);

  return (
    <>
      {cast && (
        <>
          <ul>
            {cast.map(actor => (
              <li key={actor.id}>
                <div>
                  <img
                    src={`https://image.tmdb.org/t/p/w200/${actor.profile_path}`}
                    alt={actor.name}
                    style={{ maxWidth: 100 }}
                  />
                  <p>{actor.name}</p>
                  <p>{actor.character}</p>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
      {!cast && (
        <>
          <h2>Nothing found</h2>
        </>
      )}
    </>
  );
}
