// self-hosted jikan (docker, ../jikan-rest) on :8081
const BASE_URL = "http://localhost:8081/v4";

// bad status -> throw
async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Request failed (${res.status})`);
  }
  return res.json();
}

export function getTopAnime(limit = 6) {
  return getJson(`${BASE_URL}/top/anime?limit=${limit}`);
}

export function getSeasonNow(limit = 6) {
  return getJson(`${BASE_URL}/seasons/now?limit=${limit}`);
}

export function searchAnime({ query = "", page = 1, type = "" }) {
  const params = new URLSearchParams({ page, limit: 12 });
  if (query) params.set("q", query);
  if (type) params.set("type", type);
  return getJson(`${BASE_URL}/anime?${params.toString()}`);
}

export function getAnimeById(id) {
  // full = synopsis + trailer
  return getJson(`${BASE_URL}/anime/${id}/full`);
}

export function getAnimeCharacters(id) {
  return getJson(`${BASE_URL}/anime/${id}/characters`);
}

export function searchCharacters({ query = "", page = 1 }) {
  const params = new URLSearchParams({ page, limit: 12 });
  if (query) params.set("q", query);
  return getJson(`${BASE_URL}/characters?${params.toString()}`);
}

export function getCharacterById(id) {
  return getJson(`${BASE_URL}/characters/${id}/full`);
}
