import { useState, useEffect } from 'react';
import { fetchAdditional } from 'services/movies-api';

export default function MovieReviewsSubPage({ id }) {
  const [reviews, setReviews] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const result = await fetchAdditional(id, 'reviews');
        setReviews(result.results);
      } catch (error) {
        console.log(error);
      }
    })();

    // fetchAdditional(id, 'credits').then(setCast);
  }, [id]);

  console.log('reviews', reviews);

  return (
    <>
      {reviews && (
        <>
          {/* <h2>Movie Reviews Sub Page tittle</h2> */}
          <ul>
            {reviews.map(review => (
              <li key={review.id}>
                <h2>{review.author}</h2>
                <p>{review.content}</p>
              </li>
            ))}
          </ul>
        </>
      )}

      {(!reviews || !reviews.length > 0) && (
        <>
          <h2>We don't have any reviews for this movie</h2>
        </>
      )}
    </>
  );
}
