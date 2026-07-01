import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopAnime, getSeasonNow } from "../api/jikan";
import AnimeCard from "../components/AnimeCard";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

function Landing() {
  const [trending, setTrending] = useState([]);
  const [seasonal, setSeasonal] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadHomeData() {
      setLoading(true);
      setError(null);
      try {
        // fire together
        const [topRes, seasonRes] = await Promise.all([
          getTopAnime(6),
          getSeasonNow(6),
        ]);
        setTrending(topRes.data);
        setSeasonal(seasonRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadHomeData();
  }, []);

  return (
    <div className="page">
      <section className="hero">
        <h1>AniVerse</h1>
        <p>
          Discover new anime, explore detailed info, and build your own
          personal watch collection - favorites, ratings, and a library that's
          entirely yours.
        </p>
        <Link to="/anime" className="btn btn-primary">
          Explore Anime
        </Link>
      </section>

      {loading && <Loader label="Loading anime..." />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          <section className="section">
            <h2>Trending Now</h2>
            {trending.length === 0 ? (
              <EmptyState message="No trending anime found." />
            ) : (
              <div className="card-grid">
                {trending.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            )}
          </section>

          <section className="section">
            <h2>This Season</h2>
            {seasonal.length === 0 ? (
              <EmptyState message="No seasonal anime found." />
            ) : (
              <div className="card-grid">
                {seasonal.map((anime) => (
                  <AnimeCard key={anime.mal_id} anime={anime} />
                ))}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
}

export default Landing;
