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
        // fire together, but don't let one dead endpoint kill the other
        const [topRes, seasonRes] = await Promise.allSettled([
          getTopAnime(6),
          getSeasonNow(6),
        ]);
        if (topRes.status === "fulfilled") setTrending(topRes.value.data);
        if (seasonRes.status === "fulfilled") setSeasonal(seasonRes.value.data);
        // only hard-fail if both are down
        if (topRes.status === "rejected" && seasonRes.status === "rejected") {
          setError(topRes.reason.message);
        }
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
