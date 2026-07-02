import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";
import RatingForm from "../components/RatingForm";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

function MyRatings() {
  const { ratings, loading, error, saveRating, deleteRating } = useAppData();
  const [editingId, setEditingId] = useState(null); // which one is open

  if (loading) return <Loader label="Loading your ratings..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <h1>My Ratings</h1>

      {ratings.length === 0 ? (
        <EmptyState message="You haven't rated any anime yet." />
      ) : (
        <ul className="ratings-list">
          {ratings.map((r) => (
            <li key={r.id} className="rating-item">
              <img src={r.image} alt={r.title} />
              <div className="rating-item-body">
                <h3>
                  <Link to={`/anime/${r.mal_id}`}>{r.title}</Link>
                </h3>

                {editingId === r.id ? (
                  <RatingForm
                    initialRating={r.rating}
                    initialComment={r.comment}
                    onSave={async (rating, comment) => {
                      await saveRating(r, rating, comment);
                      setEditingId(null);
                    }}
                  />
                ) : (
                  <>
                    <p>Rating: {r.rating}/10</p>
                    <p>{r.comment}</p>
                    <div className="rating-item-actions">
                      <button className="btn" onClick={() => setEditingId(r.id)}>
                        Edit
                      </button>
                      <button className="btn" onClick={() => deleteRating(r.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyRatings;
