import { useNavigate } from "react-router-dom";
import Card from "./Card";

// data is either the character or { character, role }
function CharacterCard({ data }) {
  const navigate = useNavigate();

  const character = data.character ?? data; // unwrap
  const role = data.role;

  const image = character.images?.jpg?.image_url ?? "";

  return (
    <Card
      image={image}
      title={character.name}
      badge={role}
      onClick={() => navigate(`/characters/${character.mal_id}`)}
    />
  );
}

export default CharacterCard;
