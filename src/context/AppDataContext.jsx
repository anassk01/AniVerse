import { createContext, useContext, useEffect, useState } from "react";
import { getAll, createItem, updateItem, deleteItem } from "../api/localApi";

const AppDataContext = createContext();

export function AppDataProvider({ children }) {
  const [favorites, setFavorites] = useState([]);
  const [ratings, setRatings] = useState([]);
  const [library, setLibrary] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load once
  useEffect(() => {
    async function loadAll() {
      try {
        const [favData, ratingData, libraryData] = await Promise.all([
          getAll("favorites"),
          getAll("ratings"),
          getAll("library"),
        ]);
        setFavorites(favData);
        setRatings(ratingData);
        setLibrary(libraryData);
      } catch (err) {
        setError(
          "Could not reach the local server. Make sure json-server is running (npm run server)."
        );
      } finally {
        setLoading(false);
      }
    }
    loadAll();
  }, []);

  // favorites

  function isFavorite(malId) {
    return favorites.some((f) => f.mal_id === malId);
  }

  async function toggleFavorite(anime) {
    const existing = favorites.find((f) => f.mal_id === anime.mal_id);

    if (existing) {
      await deleteItem("favorites", existing.id);
      setFavorites(favorites.filter((f) => f.id !== existing.id));
    } else {
      // keep displayed fields
      const newFavorite = {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images?.jpg?.image_url ?? "",
        score: anime.score ?? null,
        genres: (anime.genres ?? []).map((g) => g.name),
      };
      const created = await createItem("favorites", newFavorite);
      setFavorites([...favorites, created]);
    }
  }

  // ratings

  function getRatingForAnime(malId) {
    return ratings.find((r) => r.mal_id === malId) ?? null;
  }

  // create or update
  async function saveRating(anime, ratingValue, comment) {
    const existing = getRatingForAnime(anime.mal_id);

    if (existing) {
      const updated = { ...existing, rating: ratingValue, comment };
      const saved = await updateItem("ratings", existing.id, updated);
      setRatings(ratings.map((r) => (r.id === existing.id ? saved : r)));
    } else {
      const newRating = {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images?.jpg?.image_url ?? "",
        rating: ratingValue,
        comment,
      };
      const created = await createItem("ratings", newRating);
      setRatings([...ratings, created]);
    }
  }

  async function deleteRating(id) {
    await deleteItem("ratings", id);
    setRatings(ratings.filter((r) => r.id !== id));
  }

  // library

  function getLibraryEntry(malId) {
    return library.find((l) => l.mal_id === malId) ?? null;
  }

  async function setLibraryStatus(anime, status) {
    const existing = getLibraryEntry(anime.mal_id);

    if (existing) {
      const updated = { ...existing, status };
      const saved = await updateItem("library", existing.id, updated);
      setLibrary(library.map((l) => (l.id === existing.id ? saved : l)));
    } else {
      const newEntry = {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images?.jpg?.image_url ?? "",
        status,
      };
      const created = await createItem("library", newEntry);
      setLibrary([...library, created]);
    }
  }

  async function removeFromLibrary(id) {
    await deleteItem("library", id);
    setLibrary(library.filter((l) => l.id !== id));
  }

  const value = {
    favorites,
    ratings,
    library,
    loading,
    error,
    isFavorite,
    toggleFavorite,
    getRatingForAnime,
    saveRating,
    deleteRating,
    getLibraryEntry,
    setLibraryStatus,
    removeFromLibrary,
  };

  return (
    <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
