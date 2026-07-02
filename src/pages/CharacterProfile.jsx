import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCharacterById } from "../api/jikan";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

function CharacterProfile() {
  const { id } = useParams();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacter() {
      setLoading(true);
      setError(null);
      try {
        const res = await getCharacterById(id);
        setCharacter(res.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCharacter();
  }, [id]);

  if (loading) return <Loader label="Loading character..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!character) return <EmptyState message="Character not found." />;

  const animeAppearances = character.anime ?? [];

  return (
    <div className="page">
      <Link to="/characters" className="back-link">
        ← Back to Characters
      </Link>

      <div className="character-profile">
        <img src={character.images?.jpg?.image_url} alt={character.name} />
        <div>
          <h1>{character.name}</h1>
          <p>{character.about || "No description available."}</p>
        </div>
      </div>

      <div className="section">
        <h2>Appears in</h2>
        {animeAppearances.length === 0 ? (
          <EmptyState message="No known anime appearances." />
        ) : (
          <ul className="anime-appearances-list">
            {animeAppearances.map(({ anime, role }) => (
              <li key={anime.mal_id}>
                <Link to={`/anime/${anime.mal_id}`}>{anime.title}</Link>
                {" - "}
                {role}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default CharacterProfile;
