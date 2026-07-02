import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getAnimeCharacters } from "../api/jikan";
import CharacterCard from "../components/CharacterCard";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

function AnimeCharacters() {
  const { anime } = useOutletContext();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true);
      setError(null);
      try {
        const res = await getAnimeCharacters(anime.mal_id);
        setCharacters(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, [anime.mal_id]);

  if (loading) return <Loader label="Loading characters..." />;
  if (error) return <ErrorMessage message={error} />;
  if (characters.length === 0)
    return <EmptyState message="No characters found for this anime." />;

  return (
    <div className="card-grid">
      {characters.map((entry) => (
        <CharacterCard key={entry.character.mal_id} data={entry} />
      ))}
    </div>
  );
}

export default AnimeCharacters;
