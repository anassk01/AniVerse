import { useNavigate } from "react-router-dom";
import Card from "./Card";

function AnimeCard({ anime }) {
  const navigate = useNavigate();

  const image = anime.images?.jpg?.image_url ?? "";
  const year = anime.year ?? anime.aired?.prop?.from?.year ?? "N/A";
  const episodes = anime.episodes ?? "?";

  return (
    <Card
      image={image}
      title={anime.title}
      subtitle={`⭐ ${anime.score ?? "N/A"}`}
      meta={`${episodes} episodes · ${year}`}
      onClick={() => navigate(`/anime/${anime.mal_id}`)}
    />
  );
}

export default AnimeCard;
