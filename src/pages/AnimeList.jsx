import { useEffect, useState } from "react";
import { searchAnime } from "../api/jikan";
import AnimeCard from "../components/AnimeCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

const TYPE_OPTIONS = [
  { value: "", label: "All types" },
  { value: "tv", label: "TV" },
  { value: "movie", label: "Movie" },
  { value: "ova", label: "OVA" },
];

function AnimeList() {
  const [query, setQuery] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  const [results, setResults] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // refetch on query/type/page
  useEffect(() => {
    async function loadAnime() {
      setLoading(true);
      setError(null);
      try {
        const res = await searchAnime({ query, page, type });
        setResults(res.data);
        setHasNextPage(res.pagination?.has_next_page ?? false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadAnime();
  }, [query, type, page]);

  function handleSearch(newQuery) {
    setQuery(newQuery);
    setPage(1); // reset page
  }

  function handleTypeChange(newType) {
    setType(newType);
    setPage(1);
  }

  return (
    <div className="page">
      <h1>Browse Anime</h1>

      <div className="filters-row">
        <SearchBar onSearch={handleSearch} placeholder="Search anime..." />
        <select value={type} onChange={(e) => handleTypeChange(e.target.value)}>
          {TYPE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && results.length === 0 && (
        <EmptyState message="No anime matched your search." />
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="card-grid">
            {results.map((anime) => (
              <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
          </div>
          <Pagination page={page} hasNextPage={hasNextPage} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

export default AnimeList;
