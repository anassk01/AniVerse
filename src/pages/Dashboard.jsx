import { useAppData } from "../context/AppDataContext";
import { Loader, ErrorMessage } from "../components/StatusUI";

// count genres across favorites, return the top one
function getMostCommonGenre(favorites) {
  const counts = {};

  favorites.forEach((fav) => {
    (fav.genres ?? []).forEach((genre) => {
      counts[genre] = (counts[genre] ?? 0) + 1;
    });
  });

  const genreNames = Object.keys(counts);
  if (genreNames.length === 0) return "N/A";

  return genreNames.reduce((best, genre) =>
    counts[genre] > counts[best] ? genre : best
  );
}

function getAverageRating(ratings) {
  if (ratings.length === 0) return "N/A";
  const total = ratings.reduce((sum, r) => sum + r.rating, 0);
  return (total / ratings.length).toFixed(1);
}

function Dashboard() {
  const { favorites, ratings, library, loading, error } = useAppData();

  if (loading) return <Loader label="Loading your stats..." />;
  if (error) return <ErrorMessage message={error} />;

  const completedCount = library.filter((l) => l.status === "Completed").length;

  const stats = [
    { label: "Total Favorites", value: favorites.length },
    { label: "Completed Anime", value: completedCount },
    { label: "Average Rating", value: getAverageRating(ratings) },
    { label: "Top Genre in Favorites", value: getMostCommonGenre(favorites) },
  ];

  return (
    <div className="page">
      <h1>Dashboard</h1>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <p className="stat-value">{stat.value}</p>
            <p className="stat-label">{stat.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
