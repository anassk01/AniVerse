import { Link } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

function Favorites() {
  const { favorites, loading, error, toggleFavorite } = useAppData();

  if (loading) return <Loader label="Loading your favorites..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page">
      <h1>My Favorites</h1>

      {favorites.length === 0 ? (
        <EmptyState message="You haven't favorited any anime yet." />
      ) : (
        <div className="card-grid">
          {favorites.map((fav) => (
            <div className="card" key={fav.id}>
              <img className="card-image" src={fav.image} alt={fav.title} />
              <div className="card-body">
                <h3 className="card-title">
                  <Link to={`/anime/${fav.mal_id}`}>{fav.title}</Link>
                </h3>
                <p className="card-subtitle">⭐ {fav.score ?? "N/A"}</p>
                <button className="btn" onClick={() => toggleFavorite(fav)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
