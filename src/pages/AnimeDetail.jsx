import { useOutletContext } from "react-router-dom";
import { useAppData } from "../context/AppDataContext";
import RatingForm from "../components/RatingForm";

const LIBRARY_STATUSES = ["Plan To Watch", "Watching", "Completed"];

function AnimeDetail() {
  const { anime } = useOutletContext();
  const {
    isFavorite,
    toggleFavorite,
    getLibraryEntry,
    setLibraryStatus,
    getRatingForAnime,
    saveRating,
  } = useAppData();

  const favorited = isFavorite(anime.mal_id);
  const libraryEntry = getLibraryEntry(anime.mal_id);
  const existingRating = getRatingForAnime(anime.mal_id);

  const genres = (anime.genres ?? []).map((g) => g.name).join(", ") || "N/A";
  const studios = (anime.studios ?? []).map((s) => s.name).join(", ") || "N/A";
  const releaseDate = anime.aired?.string ?? "N/A";

  return (
    <div className="anime-detail">
      <div className="anime-detail-main">
        <img
          className="anime-detail-image"
          src={anime.images?.jpg?.image_url}
          alt={anime.title}
        />

        <div className="anime-detail-info">
          <p>{anime.synopsis || "No synopsis available."}</p>
          <ul className="anime-meta-list">
            <li>
              <strong>Score:</strong> {anime.score ?? "N/A"}
            </li>
            <li>
              <strong>Release date:</strong> {releaseDate}
            </li>
            <li>
              <strong>Genres:</strong> {genres}
            </li>
            <li>
              <strong>Studios:</strong> {studios}
            </li>
            <li>
              <strong>Episodes:</strong> {anime.episodes ?? "N/A"}
            </li>
          </ul>

          {anime.trailer?.embed_url && (
            <div className="trailer-wrapper">
              <iframe
                src={anime.trailer.embed_url}
                title="Anime trailer"
                allowFullScreen
              />
            </div>
          )}
        </div>
      </div>

      <div className="anime-detail-actions">
        <button
          className={favorited ? "btn btn-favorited" : "btn"}
          onClick={() => toggleFavorite(anime)}
        >
          {favorited ? "★ Remove from Favorites" : "☆ Add to Favorites"}
        </button>

        <div className="library-buttons">
          <span>Library status:</span>
          {LIBRARY_STATUSES.map((status) => (
            <button
              key={status}
              className={
                libraryEntry?.status === status ? "btn btn-active" : "btn"
              }
              onClick={() => setLibraryStatus(anime, status)}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Your Rating</h2>
        <RatingForm
          initialRating={existingRating?.rating ?? 5}
          initialComment={existingRating?.comment ?? ""}
          onSave={(rating, comment) => saveRating(anime, rating, comment)}
        />
      </div>
    </div>
  );
}

export default AnimeDetail;
