import { useEffect, useState } from "react";
import { searchCharacters } from "../api/jikan";
import CharacterCard from "../components/CharacterCard";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";
import { Loader, ErrorMessage, EmptyState } from "../components/StatusUI";

function CharactersList() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [results, setResults] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCharacters() {
      setLoading(true);
      setError(null);
      try {
        const res = await searchCharacters({ query, page });
        setResults(res.data);
        setHasNextPage(res.pagination?.has_next_page ?? false);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadCharacters();
  }, [query, page]);

  function handleSearch(newQuery) {
    setQuery(newQuery);
    setPage(1);
  }

  return (
    <div className="page">
      <h1>Characters</h1>
      <SearchBar onSearch={handleSearch} placeholder="Search characters..." />

      {loading && <Loader />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && results.length === 0 && (
        <EmptyState message="No characters matched your search." />
      )}

      {!loading && !error && results.length > 0 && (
        <>
          <div className="card-grid">
            {results.map((character) => (
              <CharacterCard key={character.mal_id} data={character} />
            ))}
          </div>
          <Pagination page={page} hasNextPage={hasNextPage} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

export default CharactersList;
