import { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { getAnimeById } from "../api/jikan";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

// parent route for /anime/:id - fetch the anime once here and pass it down
// to the child route via <Outlet context> so we don't fetch it twice
function AnimeDetailLayout() {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAnime() {
      setLoading(true);
      setError(null);
      try {
        const res = await getAnimeById(id);
        setAnime(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAnime();
  }, [id]); // re-run when :id changes

  if (loading) return <Loader label="Loading anime..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!anime) return <EmptyState message="Anime not found." />;

  return (
    <div className="page">
      <Link to="/anime" className="back-link">
        ← Back to Anime List
      </Link>
      <h1>{anime.title}</h1>

      <Outlet context={{ anime }} />
    </div>
  );
}

export default AnimeDetailLayout;
